import { Link } from 'react-router-dom';
import { useDispatch, connect } from "react-redux";
import { CheckCircle } from 'react-bootstrap-icons';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import { ExclamationCircle } from 'react-bootstrap-icons';
import { clearCart } from '../redux/reducers/cart-actios';

const OrderComplete = () => {
    const dispatch = useDispatch();

    const { id } = useParams();
    const [orderstatus, setOrderStatus] = useState("1");
    useEffect(() => {
        const fetchOrderNumber = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/order/getstatus?id=${id}`);
                const data = await response.json();
                console.log(data);
                if (data.status) {
                    setOrderStatus(data.status);
                    if(data.status === "2" || data.status === "3" || data.status === "4"){
                        console.log("訂單成功");
                        dispatch(clearCart())

                    }
                } else {
                    console.error('Invalid response:', data);
                }
            } catch (error) {
                console.error('Error fetching order number:', error);
            }
        };

        fetchOrderNumber();
    }, [id]);
    return (
        <div style={{ textAlign: 'center', marginTop: '16vh', marginBottom: '20vh' }}>
            {orderstatus === "2" || orderstatus === "3" || orderstatus === "4" ? <CheckCircle size={108} color="green" style={{marginBottom: '20px' }}/>:<></>}
            {orderstatus === "6" ? <ExclamationCircle size={108} color="yellow" style={{marginBottom: '20px' }}/>:<></>}
            {orderstatus === "5" ? <ExclamationCircle size={108} color="red" style={{marginBottom: '20px' }}/>:<></>}
            {orderstatus === "2" || orderstatus === "3" || orderstatus === "4" ? <h1>訂單成功!</h1>:<></>}
            {orderstatus === "6" ? <h1>款項確認中!</h1>:<></>}
            {orderstatus === "5" ? <h1>付款失敗!</h1>:<></>}
            <p>感謝您的購買，請至信箱內確認您的商品。若有任何問題歡迎聯絡客服 Email: pianolang.service@gmail.com</p>
            <p>您的訂單編號： TW{id.toString().padStart(8, '0')}</p>
            <Link to="/" style={{ textDecoration: 'none', color: 'blue', borderTop: '30px'}}>
                <button style={{ padding: '10px 20px', fontSize: '16px' }}>Go to Home</button>
            </Link>
        </div>
    );
};
const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => dispatch(clearCart()),
  };
};
export default connect(mapDispatchToProps)(OrderComplete);