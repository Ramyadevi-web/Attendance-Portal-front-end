import { createContext,useContext,useEffect,useState } from "react"
import { decodeToken, useJwt } from "react-jwt";
import { useNavigate } from "react-router-dom";


const authContext = createContext({
    isLoggedIn:false,
    setIsLoggedIn : ()=>{},
    decodedToken:{}
})



export const useAuthContext = () => useContext(authContext)

export default function authContextComponent({children}){
    
    const [isFirstLogin, setIsFirstLogin] = useState(true);

    const navigate = useNavigate()

   const [isLoggedIn,setIsLoggedIn] = useState(false)

   //get token from session storage
   const [token, setToken] = useState(() => sessionStorage.getItem("_tk"));

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

    //Watch decoded token to navigate to the correct route
  useEffect(() => {
    if (decodedToken && isFirstLogin) {
      console.log("decodeRoles",decodedToken.roles)
    
      if (decodedToken.roles.includes("Student")) {
        navigate('/student-dashboard');
      } else if (decodedToken.roles.includes("Teacher")) {
        navigate('/teacher-dashboard');
      } else if (decodedToken.roles.includes("Admin")) {
        navigate('/admin-dashboard');
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

   return <authContext.Provider value={values}>{children}</authContext.Provider>
}