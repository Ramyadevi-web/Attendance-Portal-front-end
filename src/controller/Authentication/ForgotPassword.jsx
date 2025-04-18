import React ,{useRef}from 'react'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {

  const emailRef = useRef()
  const navigate = useNavigate()

  const handleForgotPassword = (event)=>{
     event.preventDefault()

     const email = emailRef.current.value;
     
     if(!email){
      alert("Enter valid email Id")
     }

     fetch("http://localhost:8000/auth/forgotPassword",
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          email
        })
      }
     )
     .then((response)=>response.json())
     .then((result)=>{
      if(result && result.success ){
        alert(result.message)
        navigate('/')
      }
      else
        alert(result.message)
      })
     .catch((error)=>console.log(error))
  }

  return (
    <Container>
    <h1 className='d-flex justify-content-center my-5 fw-5'>Forgot Password</h1>
  <div className="d-flex justify-content-center align-items-center vh-90">
  <Card style={{ width: '30rem' }} className="p-5 shadow">

    <Form>  
      <Form.Group as={Row} className="mb-5" controlId="formPlaintextEmail">
        <Form.Label  className='mb-4'>
          Enter your registered emailid to reset password
        </Form.Label>
        <Col >
          <Form.Control type="email" placeholder="email@example.com" ref={emailRef} />
        </Col>
      </Form.Group>

      <div className="text-end d-flex justify-content-center">
        <button className="btn btn-primary  px-4 py-2" onClick={handleForgotPassword}>Submit</button>
      </div>
    </Form>
  </Card>
  </div>
</Container>

  )
}

export default ForgotPassword
