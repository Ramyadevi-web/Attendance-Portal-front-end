import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../Context/AuthContext';



const useLogout = () =>{

  const navigate = useNavigate()
  const {setIsLoggedIn} = useAuthContext()

   const logout = () => {
        sessionStorage.removeItem('_tk')
        setIsLoggedIn(false)
        console.log("logout")
        navigate('/')
   }
   return logout
}

export default useLogout
