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
              <h6 className="mb-4">SIGN UP FOR OUR NEWSLETTER</h6>
              {/* <SubscribeCard
                mailchimpURL={mailchimpURL}
                outerCardStyle={OuterCardStyle}
                subContainerStyle={SubContainerStyle}
                subInputStyle={SubInputStyle}
                subButtonStyle={SubButtonStyle}
              /> */}
              <FooterLink href="/">
                <Social className="me-3">
                  <Facebook></Facebook>
                </Social>
              </FooterLink>
              <FooterLink href="/">
                <Social className="me-3">
                  <Instagram></Instagram>
                </Social>
              </FooterLink>
              <FooterLink href="/">
                <Social className="me-3">
                  <Twitter></Twitter>
                </Social>
              </FooterLink>
            </div>
          </Col>
          <Col>
            <h6 className="mb-4">Pages</h6>
            <Column>
              <FooterLink href="/">首頁</FooterLink>
              <FooterLink href="/ranking">熱門排行</FooterLink>
              <FooterLink href="/">歌曲分類</FooterLink>
              <FooterLink href="/">求普專區</FooterLink>
              <FooterLink href="/">Contact</FooterLink>
            </Column>
            <Column>
              <FooterLink></FooterLink>
              <FooterLink></FooterLink>
              <FooterLink></FooterLink>
            </Column>
          </Col>
          <Col>
            <h6 className="mb-4">CONTACT US</h6>
            <Column>
              <FooterLink>
                <GeoAltFill className="me-2"></GeoAltFill>
                12345 Street name, CaFooterLinkfornia
              </FooterLink>
              <FooterLink>
                <EnvelopeFill className="me-2"></EnvelopeFill>
                test@gmail.com
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
