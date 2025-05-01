import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import { Col, Row, Spinner, Form, Button, Text } from 'react-bootstrap';
import { connect } from "react-redux";
import { logout } from "../redux/reducers/user-actions";
import { useDispatch } from 'react-redux';
import 'bootstrap-icons/font/bootstrap-icons.css';
const Withdraw = ({ user }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [pendingWithdrawals, setPendingWithdrawals] = React.useState('---');
    const [totalSongs, setTotalSongs] = React.useState(5000);
    const [loadinginfo, setLoadinginfo] = React.useState(false);
    const [disabled, setdisabled] = React.useState(true);
    const [agree, setAgree] = React.useState(false);
    const description = ["此處所列為歷史所有收入，包含已提領和未提領之款項。（僅包含個人分潤） ", "此處所列為處理中之款項，因銀行及人工作業時間尚未入帳。作業時間大約１～３天", "此處所列為可提領之款項，如需提領請至提領頁面進行操作。（提領金額需大於1000元）"];
    const currentIncome = 1200; // Example income, replace with dynamic data
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
    const [formData, setFormData] = useState({
            creator_id: user?user.id:'',
            email: user?user.email:'',
            phone: user?user.phone:'',
            amount: 0,
            creator_name: user?user.username:'',
            status: '0',
            time: '',
            bank_account_name: '',
            bank_account: '',
            bank_code: '',
        });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'amount') {
            setFormData({
                ...formData,
                [name]: parseInt(value),
            });
        }else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };
    const handleSubmit = async(e) => {
        e.preventDefault();
        setLoadinginfo(true);
        const authToken = localStorage.getItem('authToken');
        const response = await fetch(process.env.REACT_APP_API_URL + '/api/creator/insertwithdrawinfo', {
            method: 'POST',
            headers: {
                'Authorization': `${authToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
            });
            if(response.status === 401){
            alert("請重新登入");
            dispatch(logout());
            navigate('/login');
            return
            }
        if (!response.ok) {
            window.alert('送出失敗，請聯絡管理員');
            setLoadinginfo(false);
            return
        }
        window.alert('送出成功，款項會在3-5個工作天內入帳');
        setLoadinginfo(false);
        navigate('/dashboard');
    };
    React.useEffect(() => {
        if (formData.bank_account_name && formData.bank_account && formData.bank_code && formData.amount && formData.email && formData.phone && agree) {
            setdisabled(false);
        } else {
            setdisabled(true);
        }
    }, [formData,agree]);
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
                    setPendingWithdrawals(data.withdraw);
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
            <Button variant="outline-secondary" onClick={() => {navigate('/dashboard')}}><i className="bi bi-arrow-return-left"></i>返回管理介面</Button>
            <h2 className="mb-2">提領款項</h2>
            <Row className="mb-4 justify-content-center align-items-center" style={{ width: '100%' }}>
                <Col md="6" className="text-center">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formEmail" className='my-3'>
                            <Form.Label>Email 地址</Form.Label>
                            <Form.Control
                                type="text"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            <Form.Label>手機號碼</Form.Label>
                            <Form.Control
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                            <Form.Label>帳戶名稱</Form.Label>
                            <Form.Control
                                type="text"
                                name="bank_account_name"
                                value={formData.bank_account_name}
                                onChange={handleChange}
                            />
                            <Form.Label>銀行代碼</Form.Label>
                            <Form.Select aria-label="Default select example" onChange={handleChange} name="bank_code">
                                <option>銀行代碼</option>
                                {bankcode.map((item) => (
                                    <option key={item.code} value={item.code + item.code}>{item.name}({item.code})</option>
                                ))}
                            </Form.Select>

                            <Form.Label>銀行帳號</Form.Label>
                            <Form.Control
                                type="text"
                                name="bank_account"
                                value={formData.bank_account}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        
                    </Form>
                </Col>
                <Col md="6" className="text-center">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formEmail" className='my-3'>
                            <Card className="mb-4">
                                <Card.Body>
                                    <Card.Title>可提領金額</Card.Title>
                                    <Card.Text>{pendingWithdrawals}元</Card.Text>
                                </Card.Body>
                            </Card>
                            <Form.Label>提領金額</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="amount"
                                    value={formData.amount}
                                    onChange={handleChange}
                                    placeholder="請輸入提領金額"
                                    min={1000}
                                    max={pendingWithdrawals}
                                    
                                />
                            <Form.Text >
                            Your password must be 8-20 characters long, contain letters and numbers,
                            and must not contain spaces, special characters, or emoji.
                            </Form.Text>
                            <Form>
                                <div key={`default-checkbox`} className="mb-3">
                                    <Form.Check // prettier-ignore
                                    type='checkbox'
                                    id={`default-checkbox`}
                                    label={`我已閱讀並同意服務條款`}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setAgree(true);
                                        } else {
                                            setAgree(false);
                                        }
                                    }}
                                    checked={agree}
                                    />
                                </div>
                            </Form>
                            <Button variant="dark" type="submit" style={{marginRight:"20px",marginBottom:"20px"}} onClick={handleSubmit} disabled={disabled}>
                                {loadinginfo ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />: "確認提領"}
                            </Button>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </div>
    );
};
const mapStateToProps = (state) => {
    return {
      user: state.user.user,
    };
  };
export default connect(mapStateToProps)(Withdraw);
