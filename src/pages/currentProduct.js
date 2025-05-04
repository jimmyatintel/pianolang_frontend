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
import nopic from "../images/nopic.png";
import product1_firstpage from "../images/product1_firstpage.png";
import { Spinner } from "react-bootstrap";
const checkS3Url = async (url) => {
  try {
      const response = await fetch(url, { method: 'HEAD' });

      if (response.ok) {
          console.log(`✅ Valid: ${url}`);
          return true;
      } else {
          console.log(`❌ Invalid (Status: ${response.status}): ${url}`);
          return false;
      }
  } catch (error) {
      console.log(`❌ Error checking URL: ${error}`);
      return false;
  }
};
function CurrentProductPage({addToCart, adjustQuantity}) {
  const priceOld = {
    textDecorationLine: "line-through",
    color: "#afaaaa",
  };
  const { id } = useParams();
  const [currentItem, setCurrentItem] = useState(null);
  const [currentStatus, setCurrentStatus] = useState(null);
  const [mp3link, setmp3link] = useState(null);
  const [coverlink, setcoverlink] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchProduct = async () => {
      console.log(id);
      const response = await fetch(process.env.REACT_APP_API_URL+`/api/getsonginfo?id=${id}`);
      const data = await response.json();
      console.log(data);
      if (data.description) {
        data.description = data.description.replace(/&quot;/g, '"');
      }
      if (data.song_name) {
        data.song_name = data.song_name.replace(/&quot;/g, '"');
      }
      setCurrentItem(data);
      const response2 = await fetch(process.env.REACT_APP_API_URL+`/api/getsongstatus?id=${id}`);
      const data2 = await response2.json();
      setCurrentStatus(data2);
      console.log(data2);
      const mp3name = data.pdf_name.slice(0, -4);
      let newmp3name = ""
      if (data2.rule === 0) {
        newmp3name = mp3name.replace(/\(.*?\)/g, "").trim();
        if (mp3name.includes("(原調)")) {
          newmp3name = newmp3name+"(原調).mp3";;
        }else {
          newmp3name = newmp3name+".mp3";
        }
      }else {
        newmp3name = mp3name+".mp3";
      }
      setmp3link("https://pianolangmusic.s3.us-east-2.amazonaws.com/"+encodeURIComponent(newmp3name));
      setcoverlink("https://pianolangpic.s3.us-east-2.amazonaws.com/"+encodeURIComponent(data.pdf_name.slice(0, -4)+".png"));
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
  if (!currentItem || !currentStatus) {
    return (
      <Container className="my-3" style={{ textAlign: 'center', minHeight: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Spinner animation="border" role="status">
          {/* <span className="sr-only">Loading...</span> */}
        </Spinner>
      </Container>
    );
  }
  return (
    <Container className="my-3">
      <Card className="border-0 position-relative flex-row flex-column flex-md-row">
        <img
          src={currentStatus.cover_status === true ? coverlink : nopic}
          height="500px"
          width="400px"
          alt={currentItem.song_name+"的封面"}
          className="img-fluid mb-3 mb-md-0"
        />
        <Card.Body className="w-100 w-md-50 text-left mt-5 mb-5">
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
          <Card.Text className="price-new mb-0">$ {currentItem.price} NTD</Card.Text>
          <Card.Text className="price-old" style={priceOld}>
            $ {currentItem.price * 1.2} NTD
          </Card.Text>
          <hr></hr>
          <Card.Text>{currentItem.description}</Card.Text>
          <ButtonGroup className="mt-5 btnGroup d-flex justify-content-center mb-3 ">
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
              disabled={currentStatus.pdf_status === false}
            >
              加入購物車
            </Button>
          </ButtonGroup>
        </Card.Body>
      </Card>
      <Card.Title>試聽音檔</Card.Title>
      {currentStatus.mp3_status === true ? (
        <ReactPlayer url={mp3link} width="100%" controls={true} style={{ maxHeight: '100px' }} />
      ) : (
        <p>音檔不存在</p>
      )}
      <Card className="border-0 position-relative">
        <img src={coverlink} width="100%" alt="" />
      </Card>
      {currentItem.youtube_link !== "" ? (
        <>
          <Card.Title>試聽連結</Card.Title>
          <ReactPlayer url={currentItem.youtube_link} width="100%" controls={true} />
        </>
      ) : (
        <></>
      )}
      {currentItem.youtube_link2 !== "" ? (
        <>
          <Card.Title>試聽連結2</Card.Title>
          <ReactPlayer url={currentItem.youtube_link2} width="100%" controls={true} />
        </>
      ) : (
        <></>
      )}
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