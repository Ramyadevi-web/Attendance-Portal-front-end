import { createContext,useContext,useEffect,useState } from "react"
import { decodeToken, useJwt } from "react-jwt";
import { useNavigate } from "react-router-dom";


const AuthContext = createContext({
    isLoggedIn:false,
    setIsLoggedIn : ()=>{},
    decodedToken:{},
    setToken: () => {},
})



export const useAuthContext = () => useContext(AuthContext)

export default function AuthContextComponent({children}){
    
    const [isFirstLogin, setIsFirstLogin] = useState(true);

    const navigate = useNavigate()

   const [isLoggedIn,setIsLoggedIn] = useState(false)

   //get token from session storage
   const [token, _setToken] = useState(() => sessionStorage.getItem("_tk"));

   const setToken = (newToken) => {
    if (newToken) {
      sessionStorage.setItem('_tk', newToken);
    } else {
      sessionStorage.removeItem('_tk');
    }
    _setToken(newToken);
  };


   const {decodedToken,isExpired} = useJwt(token || "")
    
        useEffect(() => {
            if (token && !isExpired) {
            setIsLoggedIn(true);
            } else {
            setIsLoggedIn(false);
            }
        }, [token, isExpired]);

   //set logged in true if token availble using useEffect
   useEffect(() => {
    if(token){
        setIsLoggedIn(true)
    }
    },[token])


    useEffect(() => {
      console.log("Decoded Token:", decodedToken);
      console.log("Is Expired:", isExpired);
      console.log("Token:", token);
      console.log("Is Logged In:", isLoggedIn);
    }, [decodedToken, isExpired, token, isLoggedIn]);

    
    //Watch decoded token to navigate to the correct route
  useEffect(() => {
    if (decodedToken && isFirstLogin &&  decodedToken.roles) {
      console.log("decodeRoles",decodedToken.roles)
    
      if (decodedToken.roles.includes("Student")) {
        navigate('/student-dashboard');
      } else if (decodedToken.roles.includes("Teacher")) {
        navigate('/teacher-dashboard');
      } else if (decodedToken.roles.includes("Admin")) {
        navigate('/admin-dashboard');
      }else{
        navigate('/')
      }
      setIsFirstLogin(false)
    }else{
      console.log("not decoded",decodedToken)
    }

  }, [decodedToken, navigate]);


   const values = Object.seal({
    isLoggedIn,
    setIsLoggedIn,
    decodedToken,
    setToken
   })

   return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}