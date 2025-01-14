import "../../style.css";
import { Col, Container, Row } from "react-bootstrap";
import { FooterLink } from "../footer/style";
import { EnvelopeFill, HeartFill, PhoneFill, PersonCircle, BagCheckFill } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { useEffect, useState } from "react";

function TopHeader({ cart, user }) {
  //const wishTotal = useRecoilState(wishState);
  const wish = useSelector((state) => state.rw.wish);
  const [CartCounter, setCartCounter] = useState(0);
  const [WishCounter, setWishCounter] = useState(0);

  useEffect(() => {
    let cartCount = 0;
    cart.forEach((item) => {
      cartCount += item.qty;
    });
    setCartCounter(cartCount);
    let wishCount = 0;
    wish.forEach((item) => {
      wishCount += item.toCountWish;
    });
    setWishCounter(wishCount);
  }, [cart, CartCounter, wish, WishCounter]);

  return (
    <section className="header-top bg-black text-white p-2 sticky-top">
      <Container>
        <Row>
          <Col className="text-start">
            <FooterLink className="me-5">
              <EnvelopeFill className="me-2"></EnvelopeFill>
              test@gmail.com
            </FooterLink>
            {/* <FooterLink>
              <PhoneFill className="me-2"></PhoneFill>
              0595951689
            </FooterLink> */}
          </Col>
          <Col className="text-end">
            {/* <Link className="me-5 FooterLink text-white" to="/wishList">
              <FooterLink>
                <HeartFill className="me-2"></HeartFill>
                Wish List
                <span className="ms-1">({WishCounter})</span>
              </FooterLink>
            </Link> */}
            <Link className="me-5 FooterLink text-white" to="/shoppingCart">
              <FooterLink>
                <BagCheckFill className="me-2"></BagCheckFill>
                購物車
                <span className="ms-1">({CartCounter})</span>
              </FooterLink>
            </Link>

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
                  Login
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
