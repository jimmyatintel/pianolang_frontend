import {
  Box,
  Column,
  FooterLink,
  Social,
  OuterCardStyle,
  SubContainerStyle,
  SubInputStyle,
  SubButtonStyle,
} from "./style";
import { Col, Container, Row } from "react-bootstrap";
// import SubscribeCard from "react-subscribe-card";
import {
  PhoneFill,
  EnvelopeFill,
  GeoAltFill,
  Facebook,
  Instagram,
  Twitter,
} from "react-bootstrap-icons";
import "../../style.css";


function Footer() {

  const mailchimpURL = `[Your Mailchimp subscription URL]`;

  return (
    <Box>
      <Container>
        <Row>
          <Col>
            <div>
              <h6 className="mb-4">訂閱最新消息</h6>
              <Column>
              <FooterLink as="a" target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/pianolang_?igsh=MWIwcnllaHd2eTZjZA%3D%3D&utm_source=qr">
                <i className="bi bi-instagram"></i> instagram
              </FooterLink>
              <FooterLink as="a" target="_blank" rel="noopener noreferrer" href="https://www.threads.net/@pianolang_?igshid=NTc4MTIwNjQ2YQ==">
                <i className="bi bi-threads"></i> threads
              </FooterLink>
              </Column>
            </div>
          </Col>
          <Col>
            <h6 className="mb-4">Pages</h6>
            <Column>
              <FooterLink as="a" target="_blank" rel="noopener noreferrer" href="/">首頁</FooterLink>
              <FooterLink as="a" target="_blank" rel="noopener noreferrer" href="/ranking">熱門排行</FooterLink>
              <FooterLink as="a" target="_blank" rel="noopener noreferrer" href="/search">歌曲搜尋</FooterLink>
              <FooterLink as="a" target="_blank" rel="noopener noreferrer" href="/contact">求譜專區</FooterLink>
              <FooterLink as="a" target="_blank" rel="noopener noreferrer" href="/contact">Contact</FooterLink>
            </Column>
          </Col>
          <Col>
            <h6 className="mb-4">聯絡我們</h6>
            <Column>
              <FooterLink as="a" target="_blank" rel="noopener noreferrer" href="mailto:pianolang.service@gmail.com">
                <EnvelopeFill className="me-2"></EnvelopeFill>
                pianolang.service@gmail.com
              </FooterLink>
              <FooterLink as="a" target="_blank" rel="noopener noreferrer" href="/privacy">隱私權政策</FooterLink>
            </Column>
          </Col>
        </Row>
      </Container>
    </Box>
  );
}

export default Footer;
