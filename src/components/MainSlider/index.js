
import { Link } from "react-router-dom";
import "./style.css"
import Carousel from 'react-bootstrap/Carousel';

const MainSlider = () => {

  const images = [
    {
      id: 1,
      src: "https://pianolangpic.s3.us-east-2.amazonaws.com/main_ad1.png",
      alt: "First Slide"
    },
    {
      id: 2,
      src: "https://pianolangpic.s3.us-east-2.amazonaws.com/main_ad2.png",
      alt: "Second Slide"
    },
    {
      id: 3,
      src: "https://pianolangpic.s3.us-east-2.amazonaws.com/main_ad3.png",
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
