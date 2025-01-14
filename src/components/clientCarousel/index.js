import Carousel from "react-bootstrap/Carousel";
import { Container } from "react-bootstrap";
import "./style.css";
import "../MainSlider/style.css";
import img1 from "../../images/t1.jpg";
import img2 from "../../images/t2.jpg";
import img3 from "../../images/t3.jpg";

const ClientCarousel = () => {
  return (
    <div className="testimonial p-5">
      <Container className="p-5">
        <Carousel controls="false">
          <Carousel.Item>
            <Carousel.Caption className="position-relative mb-4 mt-4">
              <img alt="" src={img1} className="img-fluid mb-3 border-50" />
              <h5 className="text-dark">Janet Wilson</h5>
              <span className="text-secondary">Web Developer</span>
              <p className="text-dark mt-3">
                Rem ipsum doLoremRem ipsum doLorem ipsum ut labore et dolore ma
                ipsum ut labore et dolore Rem ipsum doLorem ipsum ut labore et
                dolore mamagna.Lorem ipsum doLorem ipsum dolor sit amet,
                consectetur adipisicing.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <Carousel.Caption className="position-relative mb-4 mt-4">
              <img alt="" src={img2} className="img-fluid mb-3 border-50" />
              <h5 className="text-dark">Janet Wilson</h5>
              <span className="text-secondary">Web Designer</span>
              <p className="text-dark mt-3">
                Rem ipsum doLoremRem ipsum doLorem ipsum ut labore et dolore ma
                ipsum ut labore et dolore Rem ipsum doLorem ipsum ut labore et
                dolore mamagna.Lorem ipsum doLorem ipsum dolor sit amet,
                consectetur adipisicing.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <Carousel.Caption className="position-relative mb-4 mt-4">
              <img alt="" src={img3} className="img-fluid mb-3 border-50" />
              <h5 className="text-dark">Janet Wilson</h5>
              <span className="text-secondary">Web Developer</span>
              <p className="text-dark mt-3">
                Rem ipsum doLoremRem ipsum doLorem ipsum ut labore et dolore ma
                ipsum ut labore et dolore Rem ipsum doLorem ipsum ut labore et
                dolore mamagna.Lorem ipsum doLorem ipsum dolor sit amet,
                consectetur adipisicing.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </Container>
    </div>
  );
};

export default ClientCarousel;
