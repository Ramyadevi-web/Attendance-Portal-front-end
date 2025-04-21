import React,{useRef,useEffect} from 'react'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import { useNavigate,Link} from 'react-router-dom';
import { useAuthContext } from '../../Context/AuthContext';

function Login() {

  const navigate = useNavigate()

  const {setIsLoggedIn,setToken} = useAuthContext()

  const emailRef = useRef(null)
  const passwordRef = useRef(null)
   
  

   function handleLogin(event){
    event.preventDefault()

    //Assigning input field value to a variable
    const email = emailRef.current.value;
    const password = passwordRef.current.value;


    // If email or password field empty
    if(!email || !password){
      alert("Invalid email or password!")
    }else{

     //Fetch loginData from server 
      fetch("https://attendance-portal-backend-n1hg.onrender.com/auth/signIn",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          email,
          password
        })
      }).then((response)=>response.json())
        .then((result)=>{
          try {
            //If login data is correct
            if(result && result.success){
              setToken(result.token);
              setIsLoggedIn(true)


            }else{ 
              //Login data not correct show alert
              alert(result.message)
            }  
          } catch (error){
            console.log(error)
          }   
    })
   }
   }

  return (


    <Container>
        <h1 className='d-flex justify-content-center my-5 fw-5'>Login</h1>
      <div className="d-flex justify-content-center align-items-center vh-90">
      <Card style={{ width: '30rem' }} className="p-5 shadow">
 
        <Form>  
          <Form.Group as={Row} className="mb-5" controlId="formPlaintextEmail">
            <Form.Label column sm="3">
              Email
            </Form.Label>
            <Col sm="9">
              <Form.Control type="text" placeholder="email@example.com"  ref={emailRef}/>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-5" controlId="formPlaintextPassword">
            <Form.Label column sm="3">
              Password
            </Form.Label>
            <Col sm="9">
              <Form.Control type="password" placeholder="*************"  ref={passwordRef} />
            </Col>
          </Form.Group>

          <div className="text-end d-flex justify-content-center">
            <button className="btn btn-primary  px-4 py-2" onClick={handleLogin}>Login</button>
          </div>
        </Form>
        
        <p className="mt-3 text-center small">
          Don’t have an account? <Link to="/signup">Sign up</Link>
        </p>
        <p className="mt-3 text-center small">
          <Link to="/forgot-password">Forgot Password?</Link>
        </p>
      </Card>
      </div>
    </Container>

  )
}

export default Login
