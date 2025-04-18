import React,{useRef} from 'react'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';



function Signup() {

  const firstNameRef = useRef(null)
  const lastNameRef = useRef(null)
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const navigate = useNavigate()


  const handleSignUp = (event)=>{
         event.preventDefault();

         const firstName = firstNameRef.current.value;
         const lastName = lastNameRef.current.value;
         const email = emailRef.current.value;
         const password = passwordRef.current.value;

       fetch("http://localhost:8000/auth/signUp",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          firstName,
          lastName,
          email,
          password
        })
       })
       .then((response)=>response.json())
       .then((result)=>{alert(result.message); 
        navigate('/')
       })
       .catch((error)=>console.log(error))
  }

  return (
    <Container>
    <h1 className='d-flex justify-content-center my-5 fw-5'>Sign Up</h1>
  <div className="d-flex justify-content-center align-items-center vh-90">
  <Card style={{ width: '30rem' }} className="p-5 shadow">

    <Form>  
    <Form.Group as={Row} className="mb-5" controlId="formPlaintextFName">
        <Form.Label column sm="3">
          First Name
        </Form.Label>
        <Col sm="9">
          <Form.Control type="text" placeholder="First Name" ref={firstNameRef} required/>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-5" controlId="formPlaintextLName">
        <Form.Label column sm="3">
          Last Name
        </Form.Label>
        <Col sm="9">
          <Form.Control type="text" placeholder="Last Name"  ref={lastNameRef} required/>
        </Col>
      </Form.Group>
      
      <Form.Group as={Row} className="mb-5" controlId="formPlaintextEmail">
        <Form.Label column sm="3">
          Email
        </Form.Label>
        <Col sm="9">
          <Form.Control type="email" placeholder="email@example.com"  ref={emailRef} required/>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-5" controlId="formPlaintextPassword">
        <Form.Label column sm="3">
          Password
        </Form.Label>
        <Col sm="9">
          <Form.Control type="password" placeholder="*************"  ref={passwordRef} required/>
        </Col>
      </Form.Group>

    

      <div className="text-end d-flex justify-content-center">
        <button className="btn btn-primary  px-4 py-2" onClick={handleSignUp}>SignUp</button>
      </div>
    </Form>
  </Card>
  </div>
</Container>
  )
}

export default Signup
