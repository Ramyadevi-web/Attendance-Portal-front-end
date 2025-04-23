import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../../Context/AuthContext';



const useLogout = () =>{

   const {setIsLoggedIn,setToken} = useAuthContext()
  const navigate = useNavigate()

   const logout = () => {
       setToken(null)
       sessionStorage.removeItem("_tk"); 
        setIsLoggedIn(false)
        console.log("logout")
        navigate('/')
   }
   return logout
}

export default useLogout
