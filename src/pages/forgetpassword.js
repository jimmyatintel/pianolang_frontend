import React from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import FacebookLogin from 'react-facebook-login';
import './style.css';
import { useState } from 'react';
import {login} from "../redux/reducers/user-actions";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function LoginPage(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [userid, setUserid] = useState('');
    const [step, setStep] = useState(1);
    const [verificationCode, setVerificationCode] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const handleForgetPassword = async(e) => {
        e.preventDefault();
        setLoading(true);
        console.log('Forget password button clicked');
        try {
            const response = await fetch(process.env.REACT_APP_API_URL + '/api/forgetpassword?email=' + email, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            });
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
            // console.log('Login successful:', data);
            if(response.status === 200){
                setUserid(data.user_id);
                setStep(2);
                setLoading(false);
            }
            else{
                window.alert('查無此帳號');
                setLoading(false);
            }
            // Handle successful login (e.g., store token, redirect user)
          } catch (error) {
            window.alert('查無此帳號');
            console.error('There was a problem with the forget password request:', error);
            setLoading(false);
            // Handle login error
          }
        // Handle login logic
    }
    const handleChangePassword = async(e) => {
        e.preventDefault();
        setLoading(true);
        console.log('Change password button clicked');
        if(password !== password2){
            window.alert('密碼不一致');
            setLoading(false);
            return;
        }
        try {
            const response = await fetch(process.env.REACT_APP_API_URL + '/api/changepassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: userid,
                    password: password,
                    token: verificationCode,
                }),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok'); 
                setLoading(false);
            }
            const data = await response.json();
            if(response.status === 200){
                window.alert('密碼修改成功');
                navigate('/login');
            }   
        }
        catch (error) {
            window.alert('密碼修改失敗');
            console.error('There was a problem with the change password request:', error);
            setLoading(false);
        }
    }
    return (
        <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <Container className="" style={{ marginBottom: '150px' }}>
        <Row className="justify-content-md-center">
          <Col md="6">
            <h2 className="text-center mt-4">忘記密碼</h2>
            {step === 1 && 
            <Form className="mb-5 mt-5">
              <Form.Group controlId="formBasicEmail">
                <Form.Label style={{fontSize: '28px'}}>請輸入註冊時填寫的電子郵件帳號</Form.Label>
                <Form.Control type="email" placeholder="Enter email" className="mb-2" onChange={(e) => setEmail(e.target.value)}/>
              </Form.Group>
              <div className="text-center mt-3 mb-5">
            </div>
            <div className="mb-4">
              <Row className="justify-content-end">
                <Col xs="auto">
                  <Button variant="dark" type="forgetpassword" block onClick={handleForgetPassword}>
                    {loading ? '查詢中...' : '送出'}
                  </Button>
                </Col>
              </Row>
              </div>
            </Form>}
            {step === 2 && 
            <Form className="mb-5 mt-5">
              <Form.Group controlId="formBasicEmail">
              <Form.Label style={{fontSize: '28px'}}>請輸入驗證碼(驗證碼已發送至您的電子郵件)</Form.Label>
              <Form.Control type="text" placeholder="Enter verification code" className="mb-2" onChange={(e) => setVerificationCode(e.target.value)}/>
                <Form.Label style={{fontSize: '28px'}}>請輸入新密碼</Form.Label>
                <Form.Control type="password" placeholder="Enter password" className="mb-2" onChange={(e) => setPassword(e.target.value)}/>
                <Form.Label style={{fontSize: '28px'}}>請再次輸入新密碼</Form.Label>
                <Form.Control type="password" placeholder="Enter password" className="mb-2" onChange={(e) => setPassword2(e.target.value)}/>
              </Form.Group>
              <div className="text-center mt-3 mb-5">
                <Button variant="dark" type="forgetpassword" block onClick={handleChangePassword}>
                  {loading ? '查詢中...' : '送出'}
                </Button>
              </div>
            </Form>}
          </Col>
        </Row>
      </Container>
    </GoogleOAuthProvider>
    );
};

export default LoginPage;