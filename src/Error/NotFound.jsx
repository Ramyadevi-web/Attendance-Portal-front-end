import React from 'react'
import { useNavigate } from 'react-router-dom'


function NotFound() {

    
const navigate = useNavigate()

  return (
    <div className='Container'> 
      <div className='Card d-flex justify-content-center align-item-center col'>
        <h2>Unauthorized...</h2>
        <h4>The Page Not Found click <a href='#' onClick={()=>navigate(-1)}>Go Back</a></h4>
      </div>
    </div>
  )
}

export default NotFound
