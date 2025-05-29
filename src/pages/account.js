import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import {logout} from "../redux/reducers/user-actions";
import { connect } from "react-redux";
import { useNavigate } from 'react-router-dom';
const AccountModify = ({ user}) => {
    console.log(user);
    const [formData, setFormData] = useState({
        username: user.username,
        email: user.email,
        phone: user.phone,
        birth: user.birth,
        creator: user.creator,
        password: '',
        password2: '',
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
        if (formData.password !== formData.password2) {
            window.alert('密碼不一致');
            return;
        }
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (formData.password && !passwordRegex.test(formData.password)) {
            window.alert('密碼必須至少8個字符，並且包含字母和數字');
            return;
        }
        e.preventDefault();
        // Handle form submission logic here
        console.log(formData);
        const authToken = localStorage.getItem('authToken');
        const user_info = {
            user_id: user.user_id,
            username: formData.username,
            email: formData.email,
            phone: formData.phone,
            birth: formData.birth,
        };
        const response = await fetch(process.env.REACT_APP_API_URL + '/api/user/modifyuser', {
            method: 'POST',
            headers: {
                'Authorization': `${authToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user_info),
          });
          if(response.status === 401){
            alert("請重新登入");
            dispatch(logout());
            navigate('/login');
            return
          }
        if (!response.ok) {
            window.alert('修改失敗');
            return
        }
        if (formData.password !== ''){
            const response2 = await fetch(process.env.REACT_APP_API_URL + '/api/user/modifypass', {
                method: 'POST',
                headers: {
                    'Authorization': `${authToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({user_id:user.user_id,password:formData.password}),
              });
            if (!response2.ok) {
                window.alert('修改密碼失敗');
                return
            }
        }
        window.alert('儲存成功');
    };

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
        navigate('/login');
        // Handle logout logic here
    };
    if (!user){
        navigate('/login');
    }
    return (
        <Container className="mt-3 mb-5">
            <Row className="justify-content-md-center">
                <Col md="6">
                    <h2>帳號設定</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formUsername" className='my-3'>
                            <Form.Label>使用者名稱</Form.Label>
                            <Form.Control
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="Enter username"
                            />
                        </Form.Group>

                        <Form.Group controlId="formEmail" className='my-3'>
                            <Form.Label>Email 地址 {user.verified===true ? "(已驗證)" : "(未驗證)"}</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter email"
                            />
                            {user.verified===false && 
                                <Button variant="dark" type="submit" className='ml-4' style={{marginRight:"20px",marginBottom:"20px"}} href='/verifyemail'>
                                    重新驗證Email
                                </Button>
                            }
                        </Form.Group>
                        <Form.Group controlId="formEmail" className='my-3'>
                            <Form.Label>手機號碼</Form.Label>
                            <Form.Control
                                type="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Enter phone"
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail" className='my-3'>
                            <Form.Label>出生年月日</Form.Label>
                            <Form.Control
                                type="date"
                                name="birth"
                                value={formData.birth}
                                onChange={handleChange}
                                placeholder="Enter birthday"
                            />
                        </Form.Group>
                        <Form.Group controlId="formPassword" className='my-3'>
                            <Form.Label>新的密碼</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Password"
                            />
                        </Form.Group>
                        <Form.Group controlId="formPassword" className='my-3'>
                            <Form.Label>再打一次密碼</Form.Label>
                            <Form.Control
                                type="password"
                                name="password2"
                                value={formData.password2}
                                onChange={handleChange}
                                placeholder="Password"
                            />
                        </Form.Group>
                        <Button variant="dark" type="submit" style={{marginRight:"20px",marginBottom:"20px"}} onClick={handleSubmit}>
                            送出
                        </Button>
                        <Button variant="dark" type="submit" className='ml-4' style={{marginRight:"20px",marginBottom:"20px"}} onClick={handleLogout}>
                            登出
                        </Button>
                        <Button variant="dark" type="submit" className='ml-4' style={{marginRight:"20px",marginBottom:"20px"}} href='/orderlist'>
                            訂單紀錄
                        </Button>
                        {formData.creator===true && 
                            <Button variant="dark" type="submit" className='ml-4' style={{marginRight:"20px",marginBottom:"20px"}} href='/dashboard'>
                                管理後台
                            </Button>
                        }
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
export default connect(mapStateToProps)(AccountModify);