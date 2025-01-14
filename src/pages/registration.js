import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { connect } from "react-redux";
import { useNavigate } from 'react-router-dom';
const Registration = ({ user}) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phone: '',
        password: '',
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://114.35.143.75:5000/registry', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData),
            });
      
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
            navigate('/');
            // Handle successful login (e.g., store token, redirect user)
          } catch (error) {
            console.error('There was a problem with the login request:', error);
            // Handle login error
          }
        // Handle form submission logic here
        console.log(formData);
    };
    if (user){
        navigate('/account');
    }
    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md="6">
                    <h2>帳號註冊</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formUsername" className='my-3'>
                            <Form.Label>使用者名稱*</Form.Label>
                            <Form.Control
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="Enter username"
                            />
                        </Form.Group>

                        <Form.Group controlId="formEmail" className='my-3'>
                            <Form.Label>Email 地址*</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter email"
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail" className='my-3'>
                            <Form.Label>手機號碼*</Form.Label>
                            <Form.Control
                                type="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Enter phone"
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail" className='my-3'>
                            <Form.Label>出生年月日*</Form.Label>
                            <Form.Control
                                type="date"
                                name="birth"
                                value={formData.birth}
                                onChange={handleChange}
                                placeholder="Enter birthday"
                            />
                        </Form.Group>
                        <Form.Group controlId="formPassword" className='my-3'>
                            <Form.Label>新的密碼*</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Password"
                            />
                        </Form.Group>
                        <Form.Group controlId="formPassword" className='my-3'>
                            <Form.Label>再打一次密碼*</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Password"
                            />
                        </Form.Group>
                        <Button variant="dark" type="submit" onClick={handleSubmit} style={{marginRight:"20px",marginBottom:"20px"}}>
                            送出
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};
const mapStateToProps = (state) => {
    return {
      user: state.user.user,
    };
  };
export default connect(mapStateToProps)(Registration);