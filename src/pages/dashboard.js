import React from 'react';
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import { Col, Row } from 'react-bootstrap';
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
    const description = ["此處所列為歷史所有收入，包含已提領和未提領之款項。（僅包含個人分潤） ", "此處所列為處理中之款項，因銀行作業時間尚未入帳暫時無法提領。作業時間大約１～３天", "此處所列為可提領之款項，如需提領請至提領頁面進行操作。（提領金額需大於1000元）"];
    const currentIncome = 1200; // Example income, replace with dynamic data

    const handleSongManagement = () => {
        navigate('/manage');
    };

    const handleSalesStatus = () => {
        navigate('/sales-status');
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
                {['歷史總計所有收入', '待處理款項', '可提領金額', '已上傳曲目'].map((title, index) => (
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
            <Table striped bordered hover className="mt-4">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>曲名</th>
                        <th>銷量</th>
                    </tr>
                </thead>
                <tbody>
                    {[
                        { rank: 1, name: 'Item A', sales: 500 },
                        { rank: 2, name: 'Item B', sales: 300 },
                        { rank: 3, name: 'Item C', sales: 200 },
                    ].map((item, index) => (
                        <tr key={index}>
                            <td>{item.rank}</td>
                            <td>{item.name}</td>
                            <td>{item.sales}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            </Col>
            <Col md="6">
            <h2 className="mb-2">過去30天銷量排行</h2>
            <Table striped bordered hover className="mt-4">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>曲名</th>
                        <th>銷量</th>
                    </tr>
                </thead>
                <tbody>
                    {[
                        { rank: 1, name: 'Item A', sales: 500 },
                        { rank: 2, name: 'Item B', sales: 300 },
                        { rank: 3, name: 'Item C', sales: 200 },
                    ].map((item, index) => (
                        <tr key={index}>
                            <td>{item.rank}</td>
                            <td>{item.name}</td>
                            <td>{item.sales}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
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
                    onClick={handleSalesStatus}
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
