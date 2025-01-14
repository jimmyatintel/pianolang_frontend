import { connect, useDispatch } from "react-redux";
import { addToCart, adjustQuantity } from "../redux/reducers/cart-actios";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { ButtonGroup, Container } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import * as Icon from "react-bootstrap-icons";
import ReactStars from "react-rating-stars-component";
import ReactPlayer from 'react-player';
import { useEffect, useState } from "react";
import product1 from "../images/product1_firstpage.png";
import product1_firstpage from "../images/product1_firstpage.png";
function CurrentProductPage({addToCart, adjustQuantity}) {
  const priceOld = {
    textDecorationLine: "line-through",
    color: "#afaaaa",
  };
  const { id } = useParams();
  const [currentItem, setCurrentItem] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchProduct = async () => {
      console.log(id);
      const response = await fetch(`http://114.35.143.75:5000/api/getsonginfo?id=${id}`);
      const data = await response.json();
      console.log(data);
      if (data.description) {
        data.description = data.description.replace(/&quot;/g, '"');
      }
      setCurrentItem(data);
    };

    fetchProduct();
  }, [id]);
  const handleToWish = (e, data) => {
    e.preventDefault();
    let btn = e.currentTarget;
    dispatch({ type: "ADD_TO_WISH", payload: { product: data, button: btn } });
  };

  /*const [inputQty, setinputQty] = useState(currentItem.qty);
  const onChangeQuantity = (event) => {
    event.preventDefault();
    let btn = event.currentTarget;
    setinputQty(parseInt(btn.value));
    adjustQuantity(currentItem.id, parseInt(btn.value));
    console.log(inputQty,"11");
    if (btn.value === btn.max) {
      alert("This is the last quantity for this product");
      /*let addCartBtn = btn.parentNode.children[2];
    addCartBtn.setAttribute("disabled", "true");
    addCartBtn.setAttribute("variant", "danger");
    addCartBtn.classList.remove("btn-dark");
    addCartBtn.classList.toggle("btn-danger");
    addCartBtn.innerHTML = "sold out";
    }
  };*/
  if (!currentItem) {
    return <div>Loading...</div>;
  }
  return (
    <Container className="my-3">
      <Card className="border-0 position-relative flex-row">
        <img src={product1} height="500px" width="400px" alt="" />
        <Card.Body className="w-50 text-left mt-5">
          <Card.Title>{currentItem.song_name}</Card.Title>
          <Card.Text className="price-new mb-0">作者：{currentItem.author}</Card.Text>
          <Card.Text className="price-new mb-0">作曲：{currentItem.composer}</Card.Text>
          <Card.Text className="price-new mb-0">作詞：{currentItem.lyricist}</Card.Text>
          <ReactStars
            count={5}
            size={24}
            color="gray"
            a11y={true}
            edit={true}
            isHalf="true"
            value={5}
            activeColor="#ffd700"
          />
          <hr></hr>
          <Card.Text className="price-new mb-0">{currentItem.price} NTD</Card.Text>
          <Card.Text className="price-old" style={priceOld}>
            110
          </Card.Text>
          <hr></hr>
          <Card.Text>{currentItem.description}</Card.Text>
          <ButtonGroup className="mt-5 btnGroup d-flex justify-content-center mb-3 position-absolute">
            <Button
              variant="dark"
              className="wish me-3"
              size="sm"
              id={currentItem.id}
              name={currentItem.name}
              onClick={(e) => handleToWish(e, currentItem)}
              disabled={currentItem.isAddedToWishlist}
            >
              <Icon.Heart color={currentItem.isAddedToWishlist === true ? "red" : "white"}></Icon.Heart>
            </Button>
            <Button
              variant="dark"
              size="sm"
              onClick={(e) => addToCart(e, currentItem, currentItem.id)}
            >
              Add To Cart
            </Button>
          </ButtonGroup>
        </Card.Body>
      </Card>
      <Card className="border-0 position-relative">
        <img src={product1_firstpage}  width="100%" alt="" />
      </Card>
      <Card.Title>試聽連結</Card.Title>
        <ReactPlayer url={currentItem.youtube_link} width="100%" />
      {/* <Card className="border-0 position-relative">
        <img src={currentItem.firstpage}  width="100%" alt="" />
      </Card> */}
    </Container>
  );
}

const mapStatetoProps = (state) => {
  return {
    
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    addToCart: (e, product, id) => dispatch(addToCart(e, product, id)),
    adjustQuantity: (id, value) => dispatch(adjustQuantity(id, value)),
  };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(CurrentProductPage);

/*<span>
              Qty
              <input
                className="ms-2"
                type="number"
                id="qty"
                name="qty"
                min="1"
                max={currentItem.maxQuantity}
                step="1"
                value={inputQty}
                onChange={onChangeQuantity}
              />
            </span>*/