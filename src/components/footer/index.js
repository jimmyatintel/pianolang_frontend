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
              <h6 className="mb-4">訂閱最新琴譜</h6>
              <FooterLink href="/">
                訂閱
              </FooterLink>
            </div>
          </Col>
          <Col>
            <h6 className="mb-4">Pages</h6>
            <Column>
              <FooterLink href="/">首頁</FooterLink>
              <FooterLink href="/ranking">熱門排行</FooterLink>
              <FooterLink href="/search">歌曲搜尋</FooterLink>
              <FooterLink href="/contact">求譜專區</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
            </Column>
            <Column>
              <FooterLink></FooterLink>
              <FooterLink></FooterLink>
              <FooterLink></FooterLink>
            </Column>
          </Col>
          <Col>
            <h6 className="mb-4">聯絡我們</h6>
            <Column>
              {/* <FooterLink>
                <GeoAltFill className="me-2"></GeoAltFill>
                12345 Street name, CaFooterLinkfornia
              </FooterLink> */}
              <FooterLink>
                <EnvelopeFill className="me-2"></EnvelopeFill>
                pianolang.service@gmail.com
              </FooterLink>
              {/* <FooterLink>
                <PhoneFill className="me-2"></PhoneFill>
                0595951689
              </FooterLink> */}
            </Column>
          </Col>
        </Row>
      </Container>
    </Box>
  );
}

export default Footer;
