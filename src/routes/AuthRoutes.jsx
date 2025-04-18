import React from 'react'
import {Routes,Route} from 'react-router-dom'
import { useAuthContext } from '../Context/AuthContext.jsx'
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from '../configs/RouteConfig.js'
import NotFound from '../Error/NotFound.jsx'

function AuthRoutes() {

   const {isLoggedIn,decodedToken} = useAuthContext();

    const userRole = decodedToken?.roles || ""

  
function publicRouter(){
  
     return PUBLIC_ROUTES.map((route,index)=>{
      return <Route key = {`${route.title}-${index}`} Component={route.Component} path={route.path} />
     })
   }
 
   function privateRouter(){
      const privateRouteList = PRIVATE_ROUTES
      .filter((route) => !route.role || route.role == userRole)
      .map((route, index) => (
        <Route
          key={`${route.title}-${index}`}
          path={route.path}
          element={<route.Component />}
        />
      ));

    privateRouteList.push(
      <Route key="private-not-found" path="*" element={<NotFound />} />
   )

   return privateRouteList;
}
 
   return (
    <Routes>
     { !isLoggedIn && publicRouter()}
     { isLoggedIn && privateRouter()}
    </Routes>
     
   )
}

export default AuthRoutes