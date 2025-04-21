import React, { useEffect, useState } from 'react';
import { Table, Button, Container, Row, Col, Form } from 'react-bootstrap';
import { useNavigate ,Link} from 'react-router-dom';

const ManageUsers = () => {

  const navigate = useNavigate()
 const [users,setUsers] = useState([]);
 const [originalUser,setOriginalUser] = useState([])

 const handleSearch = (e)=>{
  const query =  e.target.value.toLowerCase(); 

  if(query == ""){
     setUsers(originalUser)
  }
    else{
      const filteredUsers = originalUser.filter((user)=>(user.firstName + " " + user.lastName).toLowerCase().includes(query) 
                                                         || (user.role.toLowerCase().includes(query)))
       
        setUsers(filteredUsers)
    }
 }

 const handleDelete =  async (id)=>{
  try {
    console.log("id",id)
   const response = await fetch(`https://attendance-portal-backend-n1hg.onrender.com/dashboard/delete-user/${id}`,
      {
        method:"DELETE",
      }
    ) 
    const data = await response.json();

    if (response.ok) {
      setUsers((prevUsers) => prevUsers.filter(user => user._id !== id));
    } else {
      alert(`Error: ${data.message}`); 
  } }catch (error) {
    console.log(error)
  }
  
 }

  useEffect(() => {
    fetch('https://attendance-portal-backend-n1hg.onrender.com/dashboard/admin-dashboard')
      .then((response) => response.json())
      .then((result) => {
        setOriginalUser(result.users || []);
        setUsers(result.users || []);
      })
      .catch((error) => {
        console.log("Error fetching users:", error);
      });
  }, []);


  return (
    <Container className="mt-5">
      <Row className="mb-4">
        <Col><h2>Manage Users</h2></Col>
        <Col className="text-end">
          <Button variant="primary" onClick={()=>navigate('/add-user',{state:{source: 'ManageUsers'}})}>+ Add User</Button>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={4}>
          <Form.Control type="text" placeholder="Search by name or role" onChange={(e)=>handleSearch(e)}/>
        </Col>
      </Row>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {users.length > 0 ? (users.map((user,index)=>(
          <>
          <tr key={user._id || index}>
            <td>{index + 1}</td>
            <td>{user.firstName +"  "+ user.lastName}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>{user.department}</td>
            <td>
              <Link to={`/dashboard/edit-user/${user._id}`}><Button  variant="outline-success" size="sm" >Edit</Button></Link>&nbsp;
              <Button variant="outline-danger" size="sm" onClick={()=>handleDelete(user._id)}>Delete</Button>
            </td>
          </tr>
        </>
        ))) : (
          <tr>
            <td colSpan="6" className="text-center">No users found</td>
          </tr>
        )
      }
        
        </tbody>
      </Table>
    </Container>
  );
};

export default ManageUsers;