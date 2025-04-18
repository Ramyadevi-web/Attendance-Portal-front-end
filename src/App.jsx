import React, { useState } from 'react'

import AuthRoutes from './routes/AuthRoutes.jsx'
import AuthContextComponent from './Context/AuthContext.jsx'
import { BrowserRouter } from 'react-router-dom'

function App() {
  return(
    <>
     <BrowserRouter>
     <AuthContextComponent>
       <AuthRoutes/>  
    </AuthContextComponent>
    </BrowserRouter>
    </>
  ) 
}

export default App
