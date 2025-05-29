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
    const description = ["此處所列為歷史所有訂單，僅包含重工服館之訂單。", "可直接於付款時折抵", "此為來自官方或是做去加之訊息，如有任何問題歡迎來信詢問。"];

    const handleAccountchange = () => {
        navigate('/account');
    };

    const handleSalesStatus = () => {
        navigate('/creatororder');
    };
    const handleOrderlist = () => {
        navigate('/orderlist');
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
        fetchData();
    }
    , []);
    return (
        <div className="container mt-5">
            <h1 className="mb-4">Dashboard</h1>
            <h2 className="mb-2">歡迎回來 {user ? user.username : ''} !</h2>
            <Row className="mb-4 justify-content-center align-items-center" style={{ width: '100%' }}>
                {['訂單數量', '回饋金額', '通知'].map((title, index) => (
                    <Card key={index} className="m-3" style={{ width: '18rem', height: '10rem' }}>
                        <Card.Body>
                            {loadinginfo ? <Card.Title className="text-success">Loading...</Card.Title> : null}
                            {index === 0 && loadinginfo === false ?<Card.Title className="text-success">{totalIncome}</Card.Title> : null}
                            {index === 1 && loadinginfo === false ?<Card.Title className="text-success">{pendingIncome}</Card.Title> : null}
                            {index === 2 && loadinginfo === false ?<Card.Title className="text-success">{pendingWithdrawals}</Card.Title> : null}
                            <Card.Subtitle className="mb-2 text-muted">{title}</Card.Subtitle>
                            <Card.Text>
                                {description[index]}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                ))}
            </Row>
            <Row className="mb-2 justify-content-center align-items-center" style={{ width: '100%', minHeight: '30vh'}}>
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
                    onClick={handleAccountchange}
                    className="btn btn-primary me-2"
                >
                    帳號設定
                </button>
                <button
                    onClick={handleOrderlist}
                    className="btn btn-primary me-2"
                >
                    歷史訂單紀錄
                </button>
                <button
                    onClick={handleSalesStatus}
                    className="btn btn-primary"
                >
                    通知
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
