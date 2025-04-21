import React from 'react'
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import {  useNavigate } from 'react-router-dom';

function EditUser() {

    const location = useLocation();

    const firstNameRef = useRef(null)
      const lastNameRef = useRef(null)
      const emailRef = useRef(null)
      const passwordRef = useRef(null)

      const navigate = useNavigate()

      const [selectedRole,setSelectRole] = useState("Select Role")
      const [selectedDepartment,setSelectDepartment] = useState("Select Department")
      const [showDepartment,setShowDepartment] = useState(false)
    
      const handleSelect =  (eventKey,event)=>{
      
        if(event.target.classList.contains('role')){
             setSelectRole(eventKey)
            setShowDepartment(eventKey === 'Teacher') 
        }
        else if(event.target.classList.contains('department')){
          setSelectDepartment(eventKey)  
        }
          
      }

      const handleEditUser = (event)=>{
             event.preventDefault();
             const firstName = firstNameRef.current.value;
             const lastName = lastNameRef.current.value;
             const email = emailRef.current.value;
             const password = passwordRef.current.value;
             const role = selectedRole;
            
             const department = (selectedRole === "Teacher") ? selectedDepartment: ""
            //  console.log('addduser role', {
            //   firstName,
            //   lastName,
            //   email,
            //   password,
            //   role,
            //   ...(role !== "Admin" && {attendance:[]})
            // })
           fetch("https://attendant-portal-backend.onrender.com/dashboard/manage-users/edit-user/:id",{
            method:"PUT",
            headers:{
              "Content-Type":"application/json"
            },
            body:JSON.stringify({
              firstName,
              lastName,
              email,
              password,
              role,
              ...(role !== "Admin" && {attendance:[]})
            })
           })
           .then((response)=>response.json())
           .then((result)=>{ 
            alert(`User ${result.user.firstName + " " +result.user.lastName} updated successfully`)
            
                navigate('/manage-users')
              
          })
          .catch((error)=>{console.log(error)
          })
      }

  return (
    <Container>
    <h1 className='d-flex justify-content-center my-5 fw-5'>Add User</h1>
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

      <Form.Group as={Row} className="mb-5" controlId="formPlaintextPassword">
        <Form.Label column sm="3">
          Select Role
        </Form.Label>
      
      <Col sm="9">
      <Dropdown onSelect={handleSelect}>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {selectedRole || "Select Role"}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item className='role' eventKey="Student" onClick={(e)=>handleSelect("Student",e)}>Student</Dropdown.Item>
          <Dropdown.Item className='role' eventKey="Teacher"  onClick={(e)=>handleSelect("Teacher",e)}>Teacher</Dropdown.Item>
          <Dropdown.Item className='role' eventKey="Admin"  onClick={(e)=>handleSelect("Admin",e)}>Admin</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      </Col>
      </Form.Group>

      {showDepartment && ( <Form.Group as={Row} className="mb-5" controlId="formPlaintextPassword">
        <Form.Label column sm="3">
          Department
        </Form.Label>
      
      <Col sm="9">
      <Dropdown onSelect={handleSelect}>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {selectedDepartment || "Select Department"}
        </Dropdown.Toggle>

        <Dropdown.Menu >
          <Dropdown.Item className='department' eventKey="CS" onClick={(e)=>handleSelect("CS",e)}>CS</Dropdown.Item>
          <Dropdown.Item className='department' eventKey="Math" onClick={(e)=>handleSelect("Math",e)} >Math</Dropdown.Item>
          <Dropdown.Item className='department' eventKey="English" onClick={(e)=>handleSelect("English",e)} >English</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      </Col>
      </Form.Group>
      )}

      <div className="text-end d-flex justify-content-center">
        <button className="btn btn-primary  px-4 py-2" onClick={(e)=>handleEditUser(e)}>Add User</button>
      </div>
    </Form>
  </Card>
  </div>
</Container>
  )
}

export default EditUser
