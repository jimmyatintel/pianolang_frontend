import { Container } from "react-bootstrap";
import Carousel from "../../../node_modules/react-multi-carousel";
import "../../../node_modules/react-multi-carousel/lib/styles.css";
import "./style.css";
import "../MainSlider/style.css";
import ProductCardElement from "./utility";
import { ProductsResponsive } from "../../services/responsive";
import { useDispatch, connect } from "react-redux";
import { useEffect } from "react";
import { loadProducts } from "../../redux/reducers/cart-actios";

function ProductCard(props) {
  let slidess = props.slides;
  let loadProducts = props.loadProducts;
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('ProductCard useEffect triggered');
    loadProducts(slidess);
  }, [loadProducts, slidess]);

  return (
    <div className="productSlider mb-5 mt-5">
      <Container>
        {/* <h5 className="text-left mb-4 ms-4">FEATURED PRODUCTS</h5> */}
        <Carousel controls="false" responsive={ProductsResponsive}>
          {slidess.map((slide) => (
            <ProductCardElement slidePro={slide} />
          ))}
        </Carousel>
      </Container>
    </div>
  );
}

const mapDispatchtoProps = (dispatch) => {
  return {
    loadProducts: (products) => dispatch(loadProducts(products)),
  };
};

export default connect(null, mapDispatchtoProps)(ProductCard);
