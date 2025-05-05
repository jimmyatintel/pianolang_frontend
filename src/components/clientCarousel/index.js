import Carousel from "react-bootstrap/Carousel";
import { Container } from "react-bootstrap";
import "./style.css";
import "../MainSlider/style.css";
import img1 from "../../images/pichia06-5.jpg";
import img2 from "../../images/louisliaologo.jpg";

const ClientCarousel = () => {
  return (
    <div className="testimonial p-5 d-md-block d-none ">
      <Container className="p-5" >
        <Carousel controls="false" style={{minHeight: '400px'}}>
          <Carousel.Item>
            <Carousel.Caption className="position-relative mb-2 mt-4">
              <img alt="" src={img1} className="img-fluid mb-3 border-50" style={{width: '100px', height: '100px'}} />
              <h5 className="text-dark">Pichia</h5>
              <span className="text-secondary">資深專業製譜家</span>
              <p className="text-dark mt-3" style={{fontSize: '18px'}}>
              前YAMAHA專任教師,多年專職編譜(五線/數字簡譜獨奏,伴奏譜)經驗.原廷廷鋼琴網專職編譜者.有上萬份琴譜在該網站.
              日前廷廷鋼琴網停止下載,身為專業編譜者,原則上我會繼續製譜,會將琴譜移至此網站供網友下載.
              若有任何問題,歡迎來信:E-mail:bj0805@gmail.com 感謝!
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <Carousel.Caption className="position-relative mb-2 mt-4">
              <img alt="" src={img2} className="img-fluid mb-3 border-50" style={{width: '100px'}} />
              <h5 className="text-dark">Louisliao</h5>
              <span className="text-secondary">資深專業製譜家</span>
              <p className="text-dark mt-3" style={{fontSize: '18px', minHeight: '100px'}}>
              我是LouisLiao Piano 鋼琴編曲 來自台灣，擅長編製鋼琴類型的樂譜，例如：鋼琴獨奏、鋼琴伴奏等。
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </Container>
    </div>
  );
};

export default ClientCarousel;
