import React, { useEffect, useState } from 'react';
import { Container, Card, Table, Row, Col, ProgressBar } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { LogOut } from 'lucide-react';
import useLogout from './Logout/Logout';
import {useAuthContext} from '../../Context/AuthContext.jsx'

const StudentDashboard = () => { 

  const logout = useLogout()
  const {decodedToken} = useAuthContext()

  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [studentName, setStudentName] = useState('');
  const [attendancePercentage, setAttendancePercentage] = useState(0);
 

  useEffect(() => {
    
   
    const studentId = decodedToken?.uid;
    
    if (!studentId || studentId.length !== 24) {
      console.error("Invalid or missing studentId");
      console.log("dtoken",decodedToken)
      return;
    }

    console.log(`http://localhost:8000/attendance/attendance-by-studentid/${studentId}`)

    fetch(`http://localhost:8000/attendance/attendance-by-studentid/${studentId}`)
      .then(res => res.json())
      .then(data => {
        const result = data.response;

        setAttendanceRecords(result.attendance || []);
        setStudentName(result.firstName || 'Student');

        const presentDays = result.attendance.filter(a => a.status == 'Present').length;

        const totalDays = result.attendance.length;
        const percentage = totalDays > 0 ? ((presentDays / totalDays) * 100).toFixed(2) : 0;
        setAttendancePercentage(percentage);
      })
      .catch(err => {
        console.error("Failed to fetch attendance:", err);
      });
  }, [decodedToken]);

  return (
    <Container className="mt-4">
    <Row>
      <Col md={10}>
      <h3 className="mb-4">Welcome, {studentName}</h3>
      </Col>
      <Col  md={2}>
        <Button variant="primary" onClick={logout}>
                    <LogOut className="me-2" size={16} /> Logout
        </Button>
      </Col>
    </Row>
      

      <Row>
        <Col md={6}>
          <Card className="p-3 mb-4">
            <h5>Attendance Summary</h5>
            <p>Total Days: {attendanceRecords.length}</p>
            <p>Present Days: {attendanceRecords.filter(a => a.status === 'Present').length}</p>
            <p>Absent Days: {attendanceRecords.filter(a => a.status === 'Absent').length}</p>
            <p>Percentage: {attendancePercentage}%</p>
            <ProgressBar now={attendancePercentage} label={`${attendancePercentage}%`} variant={attendancePercentage >= 75 ? 'success' : 'warning'} />
          </Card>
        </Col>
      </Row>

      <Card>
        <Card.Body>
          <h5 className="mb-3">Attendance Records</h5>
          <Table bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {attendanceRecords.length > 0 ? attendanceRecords.map((record, index) => (
                <tr key={record._id}>
                  <td>{index + 1}</td>
                  <td>{new Date(record.date).toLocaleDateString()}</td>
                  <td style={{ color: record.status === 'Present' ? 'green' : 'red' }}>
                    {record.status}
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="3" className="text-center">No attendance records found.</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default StudentDashboard;