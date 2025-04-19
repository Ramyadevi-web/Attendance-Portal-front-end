import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, FileBarChart2, UserPlus, BarChart2 } from 'lucide-react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';
import useLogout from '../Logout/Logout.js';
import { LogOut } from 'lucide-react';


export default function AdminDashboard() {

  const [studentCount,setStudentCount] = useState(0)
  const [teacherCount,setTeacherCount ] = useState(0)
  const [adminCount,setAdminCount] = useState(0)

   const navigate = useNavigate()
   const logout = useLogout()

  useEffect(()=>{
    fetch("http://localhost:8000/dashboard/admin-dashboard")
    .then((response)=>response.json())
    .then((result)=>{

      let student = 0,teacher = 0,admin = 0;

      result.users.map((user)=>{
       if(user.role == "Student"){
          student++
       }else if(user.role == "Teacher"){
          teacher++
       }else if(user.role == "Admin"){
          admin++
       }
      })
      setAdminCount(admin)
      setStudentCount(student)
      setTeacherCount(teacher)

      console.log(result)
  })
  },[])

  const userStats = [
    { name: 'Admin', value: adminCount, color: '#4f46e5' },
    { name: 'Teacher', value: teacherCount, color: '#06b6d4' },
    { name: 'Student', value: studentCount, color: '#10b981' },
  ];
  
  const summaryCards = [
    { label: 'Total Users', value: teacherCount + studentCount, icon: <Users />, color: 'primary' },
    { label: 'Teachers Registered', value: teacherCount, icon: <FileBarChart2 />, color: 'info' },
    { label: 'Students Registered', value: studentCount, icon: <BarChart2 />, color: 'success' },
  ];

  

  return (
    <Container fluid className="py-4">
      
      <Row className='mb-4'>
      <Col className='d-flex justify-content-end'>
        <Button variant="primary" onClick={logout}>
                    <LogOut className="me-2" size={16} /> Logout
        </Button>
      </Col>
    </Row>

      <Row className="mb-4">
        {summaryCards.map((card, index) => (
          <Col key={index} md={4} className="mb-3">
            <Card bg={card.color.toLowerCase()} text="white" className="h-100">
              <Card.Body className="d-flex justify-content-between align-items-center">
                <div>
                  <Card.Subtitle className="mb-1">{card.label}</Card.Subtitle>
                  <Card.Title>{card.value}</Card.Title>
                </div>
                <div style={{ fontSize: '1.5rem' }}>{card.icon}</div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

    
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Users by Role</Card.Title>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={userStats}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {userStats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card.Body>
      </Card>

   
      <Row>
        <Col>
          <Button variant="primary" className="me-2" onClick={()=>navigate('/add-user',{state:{source: 'AdminDashboard'}})}>
            <UserPlus className="me-2" size={16} /> Add New User
          </Button>
          <Button variant="primary" className="me-2" onClick={()=>navigate('/manage-users')}>
          <UserPlus className="me-2" size={16} /> Manage Users
          </Button>
        </Col>
      </Row>
    </Container>
  );
}