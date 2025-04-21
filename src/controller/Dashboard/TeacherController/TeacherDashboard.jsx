import React, { useEffect, useState, useRef } from 'react';
import { Container, Row, Col, Form, Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useLogout from '../Logout/Logout.js';
import { LogOut } from 'lucide-react';

const TeacherDashboard = () => {
  const [attendance, setAttendance] = useState({});
  const [date, setDate] = useState('');
  const [students,setStudents] = useState([]);

  const logout = useLogout()

  const navigate = useNavigate()

  const handleAttendanceChange = (studentId, status) => {
    setAttendance({ ...attendance, [studentId]: status });
  };

   useEffect(()=>{

      fetch("https://attendant-portal-backend.onrender.com/dashboard/admin-dashboard")
      .then((response)=>response.json())
      .then((result)=>{
  
        const studentList = result.users.filter((user)=> user.role == 'Student')
        setStudents(studentList) 
        })
       
    }
    ,[])

    const handleChangeDate = () =>{
      setAttendance({})
    }

    const handleSubmit = async () => {
      if (!date) {
        alert("Please select a date before submitting attendance.");
        return;
      }
    
      try {
        for (const student of students) {
          const status = attendance[student._id];
    
          if (!status) {
            alert(`Attendance not marked for ${student.firstName}`);
            return;
          }
        }
        for (const student of students) {
          const status = attendance[student._id];

         

          const response = await fetch('https://attendant-portal-backend.onrender.com/attendance/attendance-report', {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              id: student._id,
              status,
              date,
            })
          });
    
          const result = await response.json();
          console.log(`Submitted for ${student.firstName}:`, result);
        }
        alert("Attendance submitted successfully.");
       
      } catch (error) {
        console.error("Submission error:", error);
        alert("Something went wrong while submitting attendance.");
      }
    };
      
   

  return (
    <Container className="mt-4">
      <h3 className="mb-4 d-flex justify-content-center">Attendance Portal</h3>

      <Row className="mb-3">
        <Col md={4}>
          <Form.Control type="date" value={date} onChange={(e) =>{ const selectedDate = e.target.value;  
                                                                  setDate(selectedDate);
                                                                  localStorage.setItem('attendanceDate',selectedDate)
                                                                 handleChangeDate();
                                                                 }}/>
        </Col>
        <Col md={6} >
        <Button variant="info" onClick={()=>navigate('/teacher-dashboard/view-attendance')} className="ms-2">
          View Attendance
        </Button>
        </Col>
        <Col  md={2}>
        <Button variant="primary" onClick={logout}>
                    <LogOut className="me-2" size={16} /> Logout
        </Button>
      </Col>
      </Row>

      <Table bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Student Name</th>
            <th>Present</th>
            <th>Absent</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? students.map((student, index) =>{
            const studentName = `${student.firstName}  ${student.lastName}`
            return (
            <tr key={`${student._id}`}>
              <td>{index + 1}</td>
              <td> {studentName} </td>
              <td>
  <Form.Check 
    type="radio"
    name={`attendance-${student._id}`}
    id={`present-${student._id}`}
    onChange={() => handleAttendanceChange(student._id, 'Present')}
 
    checked={attendance[student._id] === 'Present'}
    inline
    label="✔"
  />
</td>
<td>
  <Form.Check 
    type="radio"
    name={`attendance-${student._id}`}
    id={`absent-${student._id}`}
    onChange={() => handleAttendanceChange(student._id, 'Absent')}

    checked={attendance[student._id] === 'Absent'}
    inline
    label="✖"
  />
</td>
            </tr>
          )}):(
            <tr>
              <td colSpan="4" className="text-center">No students found.</td>
            </tr>
          )}
        </tbody>
      </Table>

      <div className="text-end">
        <Button variant="success" onClick={(e)=>handleSubmit(e)}>Submit Attendance</Button>
      </div>
    </Container>
  );
};

export default TeacherDashboard
