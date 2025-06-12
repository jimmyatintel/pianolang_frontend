import "../../style.css";
import { Col, Container, Row } from "react-bootstrap";
import { FooterLink } from "../footer/style";
import { EnvelopeFill, HeartFill, PhoneFill, PersonCircle, BagCheckFill } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { useEffect, useState } from "react";

function TopHeader({ cart, user }) {
  const [CartCounter, setCartCounter] = useState(0);

  useEffect(() => {
    let cartCount = 0;
    cart.forEach((item) => {
      cartCount += parseInt(item.qty, 10);
    });
    setCartCounter(cartCount);
  }, [cart, CartCounter]);
  const handleClick = (e) => {
    window.alert("請先登入或註冊");
  }
  return (
    <section className="header-top bg-black text-white p-2 sticky-top d-none d-md-block">
      <Container>
        <Row>
          <Col className="text-start d-none d-md-block">
            <FooterLink className="me-5">
              <EnvelopeFill className="me-2"></EnvelopeFill>
              客服信箱：pianolang.service@gmail.com
            </FooterLink>
          </Col>
          <Col className="text-end">
            {user ? (
            <Link className="me-5 FooterLink text-white" to="/shoppingCart" >
              <FooterLink>
                <BagCheckFill className="me-2"></BagCheckFill>
                購物車
                <span className="ms-1">({CartCounter})</span>
              </FooterLink>
            </Link>
            ):(
              <Link className="me-5 FooterLink text-white" to="/login" onClick={handleClick}>
              <FooterLink>
                <BagCheckFill className="me-2"></BagCheckFill>
                購物車
                <span className="ms-1">({CartCounter})</span>
              </FooterLink>
            </Link>
            )
            }

            {user ? (
              <Link className="me-5 FooterLink text-white" to="/account">
                <span className="me-5 FooterLink text-white">
                  <PersonCircle className="me-2"></PersonCircle>
                  {user.username}
                </span>
              </Link>
            ) : (
              <Link className="me-5 FooterLink text-white" to="/login">
                <FooterLink>
                  <PersonCircle className="me-2"></PersonCircle>
                  登入/Login
                </FooterLink>
              </Link>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
}

const mapStateToProps = (state) => {
  return {
    cart: state.rCart.cart,
    user: state.user.user,
  };
};

export default connect(mapStateToProps)(TopHeader);
