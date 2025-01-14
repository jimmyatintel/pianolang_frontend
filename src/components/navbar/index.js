import Navbar from "react-bootstrap/Navbar";
import { Nav, Container } from "react-bootstrap";
import logo from "../../images/logo.png";
import "./style.css";

const NavBar = () => {
  return (
    <Navbar expand="lg" bg="white" className="boxShadaw p-3">
      <Container>
        <Navbar.Brand href="/">
          <img alt="logo" src={logo} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <Nav.Link href="/">首頁</Nav.Link>
            <Nav.Link href="/ranking">熱門排行</Nav.Link>
            <Nav.Link href="/search">歌曲分類</Nav.Link>
            <Nav.Link href="#link">求譜專區</Nav.Link>
            <Nav.Link href="#link">Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
