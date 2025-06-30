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
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const handleGoogleLoginSuccess = (response) => {
        console.log('Google login success:', response);
        // Handle login success (e.g., send token to your server)
      };
    
      const handleGoogleLoginFailure = (response) => {
        console.log('Google login failure:', response);
        // Handle login failure
      };
    
      const handleFacebookLogin = (response) => {
        console.log('Facebook login success:', response);
        // Handle login success (e.g., send token to your server)
      };
    const handleRegist = (e) => {
        e.preventDefault();
        console.log('Register button clicked');
        navigate('/registration');
    }
    const handleLogin = async(e) => {
        e.preventDefault();
        setLoading(true);
        console.log('Login button clicked');
        const user = { email:email, password:password };
        try {
            const response = await fetch(process.env.REACT_APP_API_URL + '/api/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(user),
            });
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
            // console.log('Login successful:', data);
            dispatch(login(data.user,data.token));

            navigate('/');
            // Handle successful login (e.g., store token, redirect user)
          } catch (error) {
            window.alert('登入失敗');
            console.error('There was a problem with the login request:', error);
            setLoading(false);
            // Handle login error
          }
        // Handle login logic
    }
    return (
        <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <Container className="" style={{ marginBottom: '150px' }}>
        <Row className="justify-content-md-center">
          <Col md="4">
            <h2 className="text-center mt-4">Login</h2>
            <Form className="mb-5">
              <Form.Group controlId="formBasicEmail">
                <Form.Label style={{fontSize: '28px'}}>電子郵件帳號</Form.Label>
                <Form.Control type="email" placeholder="Enter email" className="mb-2" onChange={(e) => setEmail(e.target.value)}/>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label style={{fontSize: '28px'}}>密碼</Form.Label> 
                <Form.Control type="password" placeholder="Password" className="mb-2" onChange={(e) => setPassword(e.target.value)}/>
                <a style={{fontSize: '18px'}} href="/forgetpassword">忘記密碼</a>
              </Form.Group>
              <div className="text-center mt-3 mb-5">
              {/* <GoogleLogin
                onSuccess={handleGoogleLoginSuccess}
                onFailure={handleGoogleLoginFailure}
                buttonText="Login with Google"
                style={{ width: '100%', marginBottom: '10px' }}
              />
              <FacebookLogin
                appId="YOUR_FACEBOOK_APP_ID"
                autoLoad={false}
                fields="name,email,picture"
                callback={handleFacebookLogin}
                textButton="Login with Facebook"
                cssClass="btnFacebook"
                icon="fa-facebook"
              /> */}
            </div>
            <div className="mb-4">
              <Row className="justify-content-end">
                <Col xs="auto">
                  <Button variant="dark" type="submit" block onClick={handleLogin} disabled={loading}>
                    {loading ? '登入中...' : '登入'}
                  </Button>
                </Col>
                <Col xs="auto">
                  <Button variant="dark" type="regist" block onClick={handleRegist}>
                    註冊
                  </Button>
                </Col>
              </Row>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </GoogleOAuthProvider>
    );
};

export default LoginPage;