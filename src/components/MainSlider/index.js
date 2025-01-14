import MainBanner1 from "../../images/Main-Banner1.jpg";
import MainBanner2 from "../../images/Main-Banner2.jpg";
import MainBanner3 from "../../images/Main-Banner3.jpg";
import { Link } from "react-router-dom";
import "./style.css"
import Carousel from 'react-bootstrap/Carousel';

const MainSlider = () => {

  const images = [
    {
      id: 1,
      src: MainBanner1,
      alt: "First Slide"
    },
    {
      id: 2,
      src: MainBanner2,
      alt: "Second Slide"
    },
    {
      id: 3,
      src: MainBanner3,
      alt: "Third Slide"
    }
  ]
    
  return (
    <Carousel controls="true">
      {images.map(imageSlide => (
          <Carousel.Item key={imageSlide.id}>
          <Link to="/">
            <img src={imageSlide.src} className="img-fluid w-100" alt={imageSlide.alt} />
          </Link>
          </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default MainSlider;
