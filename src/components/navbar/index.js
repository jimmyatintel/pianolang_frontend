import Navbar from "react-bootstrap/Navbar";
import { Nav, Container } from "react-bootstrap";
import logo from "../../images/logo.png";
import "./style.css";
import { connect } from "react-redux";

const NavBar = ({user}) => {
  return (
    <Navbar expand="lg" bg="white" className="boxShadaw p-3">
      <Container>
        <Navbar.Brand href="/">
          <img
            alt="logo"
            src={logo}
            style={{
              maxHeight: "70px",
              maxWidth: "100%",
              height: "auto",
            }}
            className="logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">首頁</Nav.Link>
            <Nav.Link href="/ranking">最新上傳</Nav.Link>
            <Nav.Link href="/search">歌曲搜尋</Nav.Link>
            <Nav.Link href="/contact">求譜專區</Nav.Link>
            <Nav.Link href="/contact">Contact</Nav.Link>
          </Nav>
          <Nav className="d-lg-none">
            <Nav.Link href="/shoppingCart">
              <i className="fas fa-shopping-cart"></i> 購物車
            </Nav.Link>
            {user ? (
              <Nav.Link href="/account">
              <i className="fas fa-user"></i> {user.username}
            </Nav.Link>
            ) : (
              <Nav.Link href="/login">
              <i className="fas fa-user"></i> 登入
            </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  };
};
export default connect(mapStateToProps)(NavBar);
