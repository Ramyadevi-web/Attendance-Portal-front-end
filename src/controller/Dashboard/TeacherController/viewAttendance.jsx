import React, { useEffect, useState, useRef } from 'react';
import { Container, Row, Col, Form, Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const viewAttendance = () =>{

    const [viewAttendance,setViewAttendance ] = useState([])

    const navigate = useNavigate()

    const date = localStorage.getItem('attendanceDate')
    console.log("date",date)
      
    useEffect (() => {
       
        if (!date) {
          alert("Please select a date to view attendance.");
          return;
        }
     
           fetch(`https://attendant-portal-backend.onrender.com/attendance/attendance-by-date/${date}`)
           .then((response)=>response.json())
           .then((result)=>{
            if (result.length === 0) {
                alert("No attendance records found for this date.");
                return;
              }
              setViewAttendance(result.filteredData);
           })
        .catch ((error) =>{
          console.error("Error fetching attendance:", error);
          alert("Failed to fetch attendance records.");
        })
      },[]);
      
    

    return (
        <Container className="mt-4">
          <h3 className="mb-4">View Report - {date}</h3>

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
              {viewAttendance.length > 0 ? viewAttendance.map((student, index) =>{
                const studentName = `${student.fullName}`
                const status = `${student.status}`
                return (
                <tr key={`${student._id}`}>
                  <td>{index + 1}</td>
                  <td> {studentName} </td>
                  <td> {status} </td>  
               </tr>
   
              )}):(
                <tr>
                  <td colSpan="4" className="text-center">No attendance record found.</td>
                </tr>
              )}
            </tbody>
          </Table>
    
          <div className="text-end">
            <Button variant="success" onClick={()=>navigate('/teacher-dashboard')}>Ok</Button>
          </div>
        </Container>
      );
}

export default viewAttendance