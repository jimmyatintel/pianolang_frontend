import React from 'react';
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import { Col, Row, Spinner } from 'react-bootstrap';
import { connect } from "react-redux";
import { logout } from "../redux/reducers/user-actions";
import { useDispatch } from 'react-redux';

const Dashboard = ({ user }) => {
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
    const description = ["此處所列為歷史所有收入，包含已提領和未提領之款項。（僅包含個人分潤） ", "此處所列為處理中之款項，因銀行及人工作業時間尚未入帳。作業時間大約１～３天", "此處所列為可提領之款項，如需提領請至提領頁面進行操作。（提領金額需大於1000元）"];
    const currentIncome = 1200; // Example income, replace with dynamic data

    const handleSongManagement = () => {
        navigate('/manage');
    };

    const handleSalesStatus = () => {
        navigate('/creatororder');
    };
    const handleWithdraw = () => {
        navigate('/withdraw');
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
                    setTotalIncome(data.history_amount);
                    setPendingIncome(data.pending_amount);
                    setPendingWithdrawals(data.withdraw);
                    setTotalSongs(data.history_song);
                    setLoadinginfo(false);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        const fetchBestSelling = async () => {
            try {
                const authToken = localStorage.getItem('authToken');
                const response = await fetch(process.env.REACT_APP_API_URL + '/api/creator/bestsellingitems', {
                    method: 'GET',
                    headers: {
                        'Authorization': `${authToken}`,
                        'Content-Type': 'application/json',
                    },
                });
                if (response.status === 401) {
                    return
                } else if (response.status === 200) {
                    const data = await response.json();
                    setBestSelling(data);
                    setLoadingBestSelling(false);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        const fetchBestSelling30 = async () => {
            try {
                const authToken = localStorage.getItem('authToken');
                const response = await fetch(process.env.REACT_APP_API_URL + '/api/creator/bestsellingitems30days', {
                    method: 'GET',
                    headers: {
                        'Authorization': `${authToken}`,
                        'Content-Type': 'application/json',
                    },
                });
                if (response.status === 401) {
                    return
                } else if (response.status === 200){
                    const data = await response.json();
                    setRecentSales(data);
                    setloadingBestSelling30(false);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchBestSelling();
        fetchBestSelling30();
        fetchData();
    }
    , []);
    return (
        <div className="container mt-5">
            <h1 className="mb-4">Dashboard</h1>
            <h2 className="mb-2">歡迎回來 {user ? user.username : ''} !</h2>
            <Row className="mb-4 justify-content-center align-items-center" style={{ width: '100%' }}>
                {['歷史總計所有收入', '處理中款項', '可提領金額', '已上傳曲目'].map((title, index) => (
                    <Card key={index} className="m-3" style={{ width: '18rem', height: '10rem' }}>
                        <Card.Body>
                            {loadinginfo ? <Card.Title className="text-success">Loading...</Card.Title> : null}
                            {index === 0 && loadinginfo === false ?<Card.Title className="text-success">{totalIncome}</Card.Title> : null}
                            {index === 1 && loadinginfo === false ?<Card.Title className="text-success">{pendingIncome}</Card.Title> : null}
                            {index === 2 && loadinginfo === false ?pendingWithdrawals > 1000?<Card.Title className="text-success">{pendingWithdrawals}</Card.Title>:<Card.Title className="text-warning">{pendingWithdrawals}</Card.Title> : null}
                            {index === 3 && loadinginfo === false ?<Card.Title className="text-info">{totalSongs}</Card.Title> : null}
                            <Card.Subtitle className="mb-2 text-muted">{title}</Card.Subtitle>
                            <Card.Text>
                                {description[index]}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                ))}
            </Row>
            <Row className="mb-2 justify-content-center align-items-center" style={{ width: '100%' }}>
            <Col md="6">
            <h2 className="mb-2">銷量排行</h2>
            {loadingBestSelling ? (
                <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
                <Spinner animation="border" role="status">
                </Spinner>
                </div>
            ) : ( bestSelling===null? '尚無資料':
            <Table striped bordered hover className="mt-4">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>曲名</th>
                        <th>銷量</th>
                    </tr>
                </thead>
                <tbody>
                    {bestSelling.map((item, index) => (
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{item.name}</td>
                            <td>{item.count}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>)}
            </Col>
            <Col md="6">
            <h2 className="mb-2">過去30天銷量排行</h2>
            {loadingBestSelling30 ? (
                <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
                <Spinner animation="border" role="status">
                </Spinner>
                </div>
            ) : ( recentSales===null? '尚無資料':
            <Table striped bordered hover className="mt-4">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>曲名</th>
                        <th>銷量</th>
                    </tr>
                </thead>
                <tbody>
                    {recentSales.map((item, index) => (
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{item.name}</td>
                            <td>{item.count}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>)}
            </Col>
            </Row>
            <div className="mt-4 mb-4">
                <button
                    onClick={handleSongManagement}
                    className="btn btn-primary me-2"
                >
                    歌曲管理
                </button>
                <button
                    onClick={handleWithdraw}
                    className="btn btn-primary me-2"
                >
                    提領款項
                </button>
                <button
                    onClick={handleSalesStatus}
                    className="btn btn-primary"
                >
                    訂單紀錄
                </button>
            </div>
        </div>
    );
};
const mapStateToProps = (state) => {
    return {
      user: state.user.user,
    };
  };
export default connect(mapStateToProps)(Dashboard);
