import {Tabs,Tab, TabContent, Container } from "react-bootstrap";
import ProductCard from "../productSlider";
import latestPro from "../../services/latestProducts";
import specialPro from "../../services/specialProducts";
import bestPro from "../../services/bestProducts";
import offersPro from "../../services/offersProducts";
import ProductCardElement from "../productSlider/utility";
import Carousel from "../../../node_modules/react-multi-carousel";
import { ProductsResponsive } from "../../services/responsive";
import { Spinner } from 'react-bootstrap';
import "./style.css";
import React from "react";

function NewProduct(props) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [slides, setSlides] = React.useState();

  React.useEffect(() => {
    const fetchnewsong = async () => {
      const response = await fetch(process.env.REACT_APP_API_URL + `/api/getnewest`);
      const data = await response.json();
      console.log(data);
      setSlides(data);
    };
    fetchnewsong();
  }, []);
  React.useEffect(() => {
    if (slides) {
      console.log("Slides data:", slides);
      setIsLoading(false);
    }
  }, [slides]);
  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '40vh' }}>
        <Spinner animation="border" role="status"  style={{marginLeft: '20px'}}>
          <span className="sr-only"></span>
        </Spinner>
      </div>
    );
  }
  return (
    <div className="productTabs">
      <Container>
      <h2 className="text-left mb-4 ms-4">最新上傳</h2>
        <div className="row">
          {slides.map((slide, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <Container>
                <ProductCardElement slidePro={slide} />
              </Container>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default NewProduct;
