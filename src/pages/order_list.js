import React, { useEffect, useState } from 'react';
import { Table, Container, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/reducers/user-actions';
import { useDispatch } from 'react-redux';


function OrderList() {
  const [orders, setOrders] = useState([]);
  const [ loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchOrders = async () => {
      const authToken = localStorage.getItem('authToken'); // Assuming the authToken is stored in localStorage
      const response = await fetch(process.env.REACT_APP_API_URL + '/api/order/getlist', {
        headers: {
          'Authorization': `${authToken}`
        }
      });
       if(response.status === 401){
          alert("請重新登入");
          dispatch(logout());
          navigate('/login');
          return
        }
      const data = await response.json();
      setOrders(data.list);
      setLoading(false);
    };

    fetchOrders();
  }, []);
  const truncateWords = (str, numWords) => {
    const words = str.split(' ');
    if (words.length > numWords) {
      return words.slice(0, numWords).join(' ') + '...';
    }
    return str;
  };

  if (loading) {
    return (
      <Container className="my-3" style={{ textAlign: 'center', minHeight: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Spinner animation="border" role="status">
          {/* <span className="sr-only">Loading...</span> */}
        </Spinner>
      </Container>
    );
  }

  return (
    <Container className="my-3" style={{ textAlign: 'center', minHeight: '60vh' }}>
      <h1>訂單紀錄</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>訂單編號</th>
            <th>時間</th>
            <th>帳號</th>
            <th>商品</th>
            <th>數量</th>
            <th>總金額</th>
            <th>訂單狀態</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{"TW" + order.order_id.toString().padStart(6, '0')}</td>
              <td>{order.time}</td>
              <td>{order.costumer_name}</td>
              <td>
                { order.items === null ? <div>無商品</div>:
                order.items.map((item, index) => (
                  <div key={index}>
                    <Link to={`/product/${item}`}>
                        {truncateWords(order.items_name[index], 5)}
                    </Link>
                </div>
                ))}
              </td>
              <td>
                { order.amount === null ? <div>無商品</div>:
                order.amount.map((a, index) => (
                  <div key={index}>{a}</div>
                ))}
              </td>
              <td>{order.total_price}</td>
              <td>
                {order.status==="1" && "尚未付款"}
                {order.status==="2" && "已付款"}
                {order.status==="3" && "已出貨"}
                {order.status==="4" && "已完成"}
                {order.status==="5" && "已取消"}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {orders.length === 0 && <h2>目前沒有訂單</h2>}
    </Container>
  );
}

export default OrderList;