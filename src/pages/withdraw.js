import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import { Col, Row, Spinner, Form, Button, } from 'react-bootstrap';
import { connect } from "react-redux";
import { logout } from "../redux/reducers/user-actions";
import { useDispatch } from 'react-redux';
import 'bootstrap-icons/font/bootstrap-icons.css';
const Withdraw = ({ user }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [totalIncome, setTotalIncome] = React.useState(100000);
    const [pendingIncome, setPendingIncome] = React.useState(100000);
    const [pendingWithdrawals, setPendingWithdrawals] = React.useState(999);
    const [totalSongs, setTotalSongs] = React.useState(5000);
    const [loadinginfo, setLoadinginfo] = React.useState(true);
    const [loadingBestSelling30, setloadingBestSelling30] = React.useState(true);
    const [loadingBestSelling, setLoadingBestSelling] = React.useState(true);
    const [bestSelling, setBestSelling] = React.useState([]);
    const [recentSales, setRecentSales] = React.useState([]);
    const [bankaccount, setBankaccount] = React.useState([]);
    const description = ["此處所列為歷史所有收入，包含已提領和未提領之款項。（僅包含個人分潤） ", "此處所列為處理中之款項，因銀行及人工作業時間尚未入帳。作業時間大約１～３天", "此處所列為可提領之款項，如需提領請至提領頁面進行操作。（提領金額需大於1000元）"];
    const currentIncome = 1200; // Example income, replace with dynamic data
    const handleSongManagement = () => {
        navigate('/manage');
    };
    const [formData, setFormData] = useState({
            username: user.username,
            email: user.email,
            phone: user.phone,
            birth: user.birth,
            creator: user.creator,
            password: '',
            password2: '',
        });

    const handleSalesStatus = () => {
        navigate('/creatororder');
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleSubmit = async(e) => {
        e.preventDefault();
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
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const authToken = localStorage.getItem('authToken');
                const response = await fetch(process.env.REACT_APP_API_URL + '/api/creator/dashboardinfo', {
                    method: 'GET',
                    headers: {
                        'Authorization': `${authToken}`,
                        'Content-Type': 'application/json',
                    },
                });
                if (response.status === 401) {
                    alert("請重新登入");
                    dispatch(logout());
                    navigate('/login');
                } else {
                    const data = await response.json();
                    
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }
    , []);
    return (
        <div className="container mt-5">
            <Button variant="outline-secondary" onClick={() => {navigate('/dashboard')}}><i class="bi bi-arrow-return-left"></i>返回管理介面</Button>
            <h2 className="mb-2">提領款項</h2>
            <Row className="mb-4 justify-content-center align-items-center" style={{ width: '100%' }}>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formUsername" className='my-3'>
                    <Form.Label>Email 地址</Form.Label>
                    <Form.Control
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="formEmail" className='my-3'>
                    <Form.Label>手機號碼</Form.Label>
                    <Form.Control
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="formEmail" className='my-3'>
                    <Form.Label>帳戶名稱</Form.Label>
                    <Form.Control
                        type="text"
                        name="accountname"
                        value={formData.accountname}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="formEmail" className='my-3'>
                    <Form.Label>銀行代碼</Form.Label>
                    <Form.Select aria-label="Default select example">
                        <option>銀行代碼</option>
                        {bankcode.map((item) => (
                            <option key={item.code} value={item.code}>{item.name}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group controlId="formPassword" className='my-3'>
                    <Form.Label>銀行帳號</Form.Label>
                    <Form.Control
                        type="text"
                        name="bankaccount"
                        value={formData.bankaccount}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="formPassword" className='my-3'>
                    <Form.Label>銀行帳號</Form.Label>
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
            </Form>
            </Row>
        </div>
    );
    const bankcode = [
        {
            "code": "004",
            "name": "臺灣銀行"
        },
        {
            "code": "005",
            "name": "臺灣土地銀行"
        },
        {
            "code": "006",
            "name": "合作金庫商業銀行"
        },
        {
            "code": "007",
            "name": "第一商業銀行"
        },
        {
            "code": "008",
            "name": "華南商業銀行"
        },
        {
            "code": "009",
            "name": "彰化商業銀行"
        },
        {
            "code": "011",
            "name": "上海商業儲蓄銀行"
        },
        {
            "code": "012",
            "name": "台北富邦商業銀行"
        },
        {
            "code": "013",
            "name": "國泰世華商業銀行"
        },
        {
            "code": "016",
            "name": "高雄銀行"
        },
        {
            "code": "017",
            "name": "兆豐國際商業銀行"
        },
        {
            "code": "021",
            "name": "花旗(台灣)商業銀行"
        },
        {
            "code": "050",
            "name": "臺灣中小企業銀行"
        },
        {
            "code": "052",
            "name": "渣打國際商業銀行"
        },
        {
            "code": "053",
            "name": "台中商業銀行"
        },
        {
            "code": "054",
            "name": "京城商業銀行"
        },
        {
            "code": "101",
            "name": "瑞興商業銀行"
        },
        {
            "code": "102",
            "name": "華泰商業銀行"
        },
        {
            "code": "103",
            "name": "臺灣新光商業銀行"
        },
        {
            "code": "108",
            "name": "陽信商業銀行"
        },
        {
            "code": "114",
            "name": "基隆第一信用合作社"
        },
        {
            "code": "115",
            "name": "基隆市第二信用合作社"
        },
        {
            "code": "118",
            "name": "板信商業銀行"
        },
        {
            "code": "119",
            "name": "淡水第一信用合作社"
        },
        {
            "code": "130",
            "name": "新竹第一信用合作社"
        },
        {
            "code": "132",
            "name": "新竹第三信用合作社"
        },
        {
            "code": "146",
            "name": "台中市第二信用合作社"
        },
        {
            "code": "147",
            "name": "三信商業銀行"
        },
        {
            "code": "162",
            "name": "彰化第六信用合作社"
        },
        {
            "code": "215",
            "name": "花蓮第一信用合作社"
        },
        {
            "code": "216",
            "name": "花蓮第二信用合作社"
        },
        {
            "code": "600",
            "name": "農金資訊股份有限公司"
        },
        {
            "code": "700",
            "name": "中華郵政股份有限公司"
        },
        {
            "code": "803",
            "name": "聯邦商業銀行"
        },
        {
            "code": "805",
            "name": "遠東國際商業銀行"
        },
        {
            "code": "806",
            "name": "元大商業銀行"
        },
        {
            "code": "807",
            "name": "永豐商業銀行"
        },
        {
            "code": "808",
            "name": "玉山商業銀行"
        },
        {
            "code": "809",
            "name": "凱基商業銀行"
        },
        {
            "code": "812",
            "name": "台新國際商業銀行"
        },
        {
            "code": "815",
            "name": "日盛國際商業銀行"
        },
        {
            "code": "816",
            "name": "安泰商業銀行"
        },
        {
            "code": "822",
            "name": "中國信託商業銀行"
        },
        {
            "code": "952",
            "name": "財團法人農漁會南區資訊中心"
        },
        {
            "code": "997",
            "name": "中華民國信用合作社聯合社南區聯合資訊處理中心"
        }
    ]
};
const mapStateToProps = (state) => {
    return {
      user: state.user.user,
    };
  };
export default connect(mapStateToProps)(Withdraw);
