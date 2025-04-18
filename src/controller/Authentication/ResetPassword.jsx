import React,{useRef} from 'react'
import { useParams, useNavigate} from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

function ResetPassword() {

    const passwordRef = useRef();
  const navigate = useNavigate();
  const { token } = useParams();

  const handleReset = (e) => {
    e.preventDefault();
    const password = passwordRef.current.value;

    fetch('http://localhost:8000/auth/reset-password/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password, token }),
    })
      .then(res => res.json())
      .then(result => {
        alert(result.message);
        if (result.success) {
            console.log("result",result)
          navigate('/');
        }
      })
      .catch(error => alert(error.message));
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
    <Card className="p-4 shadow" style={{ width: '30rem' }}>
      <h4 className="text-center mb-4">Reset Password</h4>
      <Form>
        <Form.Group>
          <Form.Label>New Password</Form.Label>
          <Form.Control type="password" ref={passwordRef} placeholder="Enter new password" />
        </Form.Group>
        <div className="text-center mt-4">
          <button className="btn btn-success" onClick={handleReset}>Reset Password</button>
        </div>
      </Form>
    </Card>
  </Container>
  )
}

export default ResetPassword
