import React from "react";
import { ButtonGroup } from "react-bootstrap";
import "../../../node_modules/react-multi-carousel/lib/styles.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
import * as Icon from "react-bootstrap-icons";
import "./style.css";
import "../MainSlider/style.css";
import { connect } from "react-redux";
import { addToCart, LoadCurrentItem } from "../../redux/reducers/cart-actios";
import { useEffect, useState } from "react";
import default_firstpage from "../../images/product1_firstpage.png";
import nopic from "../../images/nopic.png";


function ProductCardElement(props) {
  const ClickWish = props.clickWish;
  const addToCart = props.addToCart;
  const LoadCurrentItem = props.LoadCurrentItem;
  const [coverlink, setcoverlink] = useState(default_firstpage);
  const [currentStatus, setCurrentStatus] = useState(true);
  // console.log(props.slidePro);
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };
  useEffect(async() => {
      // const response2 = await fetch(process.env.REACT_APP_API_URL+`/api/getsongstatus?id=${props.slidePro.id}`);
      // const data2 = await response2.json();
      // setCurrentStatus(data2);
      setcoverlink("https://pianolangpic.s3.us-east-2.amazonaws.com/"+props.slidePro.pdf_name.slice(0, -4)+".png");
      }, [props.slidePro.pdf_name]);

  return (
    <div className="text-center productElement" key={props.slidePro.id}>
      <Card className="border-0 position-relative">
        <Link to={`/product/${props.slidePro.id}`}>
        <div className="image-wrapper">
          <Card.Img
            variant="top"
            src={coverlink}
            className="card-img-top"
            onClick={() => LoadCurrentItem(props.slidePro)}
            onError={() => setcoverlink(nopic)} // Change to fallback image if src is invalid
            alt={props.slidePro.song_name+"的封面"}
          />
          </div>
        </Link>
        <ButtonGroup className="btnGroup d-flex justify-content-center mb-3 position-absolute">
          <Button
            variant="dark"
            size="sm"
            onClick={(e) => addToCart(e, props.slidePro, props.slidePro.id)}
          >
            Add to Cart
          </Button>
        </ButtonGroup>
        <Card.Body>
          <Link to={`/product/${props.slidePro.id}`}>
            <Card.Title onClick={() => LoadCurrentItem(props.slidePro)}>
            {truncateText(props.slidePro.song_name, 33)}
            </Card.Title>
          </Link>
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex justify-content-start align-items-center">
              <Card.Text className="price-new mb-0">
                {props.slidePro.price}$
              </Card.Text>
              <Card.Text className="price-old">
                {!props.slidePro.oldPrice ? "" : props.slidePro.oldPrice}
              </Card.Text>
            </div>
            <ReactStars
              count={5}
              size={24}
              color="gray"
              a11y={true}
              edit={false}
              isHalf="true"
              value={5}
              activeColor="#ffd700"
            />
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

const mapDispatchtoProps = (dispatch) => {
  return {
    addToCart: (e, product, id) => dispatch(addToCart(e, product, id)),
    LoadCurrentItem: (product) => dispatch(LoadCurrentItem(product)),
  };
};

export default connect(null, mapDispatchtoProps)(ProductCardElement);
