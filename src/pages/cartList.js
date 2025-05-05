import "./style.css";
import { Container, Table, Row, Button, Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import ProductTrElement from "../components/productSlider/tableUtility";
import { useDispatch } from 'react-redux';
import {logout} from "../redux/reducers/user-actions";
import { useNavigate } from 'react-router-dom';
import { TruncateWords } from '../components/tool/tool';
function CartListPage(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let cart = props.cart;
  let user = props.user;
  const [subTotalPrice, setsubTotalPrice] = useState(0);
  const [discount, setdiscount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [deliver_mail, setDeliver_mail] = useState('');
  const [order_info, setOrder_info] = useState('');
  const [discountcode, setDiscountcode] = useState('');
  const handleDiscountcodechange = (e) => {
    setDiscountcode(e.target.value);
  }
  const handleDiscountcodeapply = () => {
    if (discountcode === 'Pianolang') {
      setdiscount(10);
    }
  }
  useEffect(() => {
    if(user===null){
      alert("請先登入或註冊");
      navigate('/login');
    }
    let price = 0;
    cart.forEach((item) => {
      price += item.qty * item.price;
    });
    setsubTotalPrice(price);
    setTotalPrice(price - discount);
    if (cart.length === 0) {
      setdiscount(0);
      let cartShow = document.querySelector(".cartShow");
      let table = document.querySelector("Table");
      table.style.display = "none";
      cartShow.innerHTML += "購物車是空的";
    }
    const orderinfo = {
      "user_id": user.user_id,
      "time": new Date().toISOString().slice(0, 19).replace('T', ' '),
      "items": [],
      "amount":[],
      "total_price": totalPrice,
    }
    cart.forEach((item) => {
      orderinfo.items.push(item.id);
      orderinfo.amount.push(parseInt(item.qty, 10));
    });
    setOrder_info(orderinfo);
    console.log(user);
  }, [cart, totalPrice, setTotalPrice, discount, setdiscount]);

  const handleCheckout2 = async () => {
    setLoading(true);
    try {
      const authToken = localStorage.getItem("authToken");
      const response = await fetch(process.env.REACT_APP_API_URL + "/api/order/newECPayorder", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              Authorization: `${authToken}`,
          },
          body: JSON.stringify(
              order_info
          ),
      });

      const orderData = await response.json();
      if (response.status === 401) {
        alert("請重新登入");
        dispatch(logout());
        navigate('/login');
        return;
      }
      if (response.ok && totalPrice === 0) {
        navigate("/ordercomplete/"+orderData.order_id);
      }
      if (totalPrice !== 0) {
        const res = await fetch(process.env.REACT_APP_API_URL+"/api/order/create-ecpay-order", {  
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${authToken}`,
          },
          body: JSON.stringify({
            order_id: orderData.order_id,
            amount: totalPrice,
            itemName: "琴譜",
          }),
        });
      
      const html = await res.text();
      setLoading(false);
      // Open the HTML form in a new tab
      const newWindow = window.open();
      if (newWindow) {
        newWindow.document.write(html);
        newWindow.document.close();
      }
    }
    } catch (err) {
      console.error("Failed to create ECPay order:", err);
    }
  };
  const handleEmailchange = (e) => {
    setDeliver_mail(e.target.value);
  }
  return (
    <div className="productSlider mb-5 mt-5" style={{ minHeight: "60vh" }}>
      <Container>
        <h5 className="text-left mb-4 ps-2">購物車</h5>
        <Row className="flex-column flex-md-row">
          <div className="col-md-9 cartShow mb-4 mb-md-0">
            <Table bordered hover responsive="sm">
              <thead>
                <tr>
                  <th>商品名稱</th>
                  <th>金額</th>
                  <th>數量</th>
                  <th>小計</th>
                  <th>更改</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((product, idx) => (
                  <ProductTrElement
                    product={product}
                    isWish={false}
                    isCart={true}
                  />
                ))}
              </tbody>
            </Table>
          </div>
          <div className="col-md-3 cartSum boxShadaw bg-light p-4">
            <h5 className="text-left mb-4 pb-2">購物車金額</h5>
            <div className="d-flex justify-content-between mb-4">
              <h6 className="fw-normal">小計 :</h6>
              <span>{subTotalPrice}$</span>
            </div>
            <div className="d-flex justify-content-between mb-3">
              <h6 className="fw-normal">折扣 :</h6>
              <span>{discount}$</span>
            </div>
            <div className="d-flex justify-content-between fw-bold mb-3">
              <h6>總價 :</h6>
              <span>{totalPrice}$</span>
            </div>
            <div className="d-flex justify-content-between mb-3">
              <h6 className="fw-normal">寄送電子郵件 :</h6>
            </div>
            <div className="d-flex justify-content-between mb-3">
              <input type="email" className="form-control" placeholder="請輸入電子郵件" value={user.email} onChange={handleEmailchange} contentEditable={false}/>
            </div>
            <div className="d-flex justify-content-between mb-3">
              <h6 className="fw-normal">折扣碼 :</h6>
            </div>
            <div className="d-flex justify-content-between mb-3">
              <input type="text" className="form-control" placeholder="請輸入折扣碼" value={discountcode} onChange={handleDiscountcodechange} contentEditable={false}/>
              <Button variant="outline-primary" size="sm" onClick={handleDiscountcodeapply}>適用</Button>
            </div>
            <Button variant="dark" size="md" className="mt-4 w-100" disabled={cart.length === 0} onClick={handleCheckout2}>
              {loading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />: "信用卡付款/ATM轉帳/超商付款"}
            </Button>
          </div>
        </Row>
      </Container>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    cart: state.rCart.cart,
    user: state.user.user,
  };
};

export default connect(mapStateToProps)(CartListPage);
