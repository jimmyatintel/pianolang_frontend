import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Spinner } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { connect } from "react-redux";
import { useNavigate } from 'react-router-dom';
import "./style.css"
const Registration = ({ user}) => {
    const [step, setStep] = useState(3);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        birth: '',
        token: '',
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await fetch(process.env.REACT_APP_API_URL + '/api/registry', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                window.alert("使用者名稱或EMAIL已存在，請直接登入。");
                throw new Error(response.statusText);
            }
            const data = await response.json();
            setStep(2);
            // Handle successful login (e.g., store token, redirect user)
        } catch (error) {
            console.error('There was a problem with the login request:', error);
            // Handle login error
        } finally {
            setIsLoading(false);
        }
        // Handle form submission logic here
        // console.log(formData);
    };
    const handleTokenSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await fetch(process.env.REACT_APP_API_URL + '/api/verifyemail?token=' + formData.token);
            if (!response.ok) {
                window.alert(response.statusText);
                throw new Error(response.statusText);
            }
            setStep(3);
            // Handle successful login (e.g., store token, redirect user)
        } catch (error) {
            console.error('There was a problem with the login request:', error);
            // Handle login error
        } finally {
            setIsLoading(false);
        }
        // Handle form submission logic here
        console.log(formData);
    };

    const isFormValid = () => {
        return (
            formData.username.trim() !== '' &&
            formData.email.trim() !== '' &&
            formData.phone.trim() !== '' &&
            formData.birth &&
            formData.password.trim() !== '' &&
            formData.confirmPassword.trim() !== '' &&
            formData.password === formData.confirmPassword
        );
    };
    if (user){
        navigate('/account');
    }
    return (
        <Container>
            <Row className="justify-content-md-center mb-5">
                <Col md="6">
                    <h2>帳號註冊</h2>
                    <div className="stepper">
                        <div className={` ${step === 1 ? 'activestep' : 'inactivestep'}`}>Step 1: 基本資料</div>
                        <div className={`step ${step === 2 ? 'activestep' : 'inactivestep'}`}>Step 2: 安全性</div>
                        <div className={`step ${step === 3 ? 'activestep' : 'inactivestep'}`}>Step 3: 完成</div>
                    </div>
                    {step === 1 && (
                        <Form>
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
                            <Form.Group controlId="formPhone" className='my-3'>
                                <Form.Label>手機號碼*</Form.Label>
                                <Form.Control
                                    type="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Enter phone"
                                />
                            </Form.Group>
                            <Form.Group controlId="formBirth" className='my-3'>
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
                            <Form.Group controlId="formConfirmPassword" className='my-3'>
                                <Form.Label>再打一次密碼*</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Confirm Password"
                                />
                            </Form.Group>

                            <Button variant="dark" onClick={handleSubmit} disabled={!isFormValid()}>
                                {isLoading===true?<Spinner animation="border" role="status"  style={{marginLeft: '20px'}}>
                                    <span className="sr-only"></span>
                                </Spinner>
                                :"下一步"}
                            </Button>
                        </Form>
                    )}
                    {step === 2 && (
                        <Form>
                            <Form.Group controlId="formPassword" className='my-3'>
                                <Form.Label>驗證碼已發送到{formData.email}</Form.Label>
                                <Form.Label>請輸入您收到的驗證碼</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="token"
                                    value={formData.token}
                                    onChange={handleChange}
                                    placeholder=""
                                />
                            </Form.Group>
                            <Button variant="dark" onClick={() => setStep(1)} style={{ marginRight: "20px" }}>
                                上一步
                            </Button>
                            <Button variant="dark" onClick={handleTokenSubmit} disabled={formData.token.trim() === ''}>
                                {isLoading===true?<Spinner animation="border" role="status"  style={{marginLeft: '20px'}}>
                                    <span className="sr-only"></span>
                                </Spinner>
                                :"下一步"}
                            </Button>
                        </Form>
                    )}
                    {step === 3 && (
                        <div>
                            <h3 className='mt-5'>信箱已驗證</h3>
                            <p>您可以開始選購琴譜！</p>
                            <Button variant="dark" href='/' style={{ marginRight: "20px" }}>
                                回首頁
                            </Button>
                        </div>
                    )}
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