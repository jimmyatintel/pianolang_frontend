import "./style.css";
import Button from "react-bootstrap/Button";
import * as Icon from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { useDispatch, connect } from "react-redux";
import { useState, useEffect } from "react";
import {
  addToCart,
  adjustQuantity,
  deleteFromCart,
  LoadCurrentItem,
} from "../../redux/reducers/cart-actios";

function ProductTrElement(props) {
  const dispatch = useDispatch();

  let addToCart = props.addToCart;
  let adjustQuantity = props.adjustQuantity;
  let deleteFromCart = props.deleteFromCart;
  let deleteFromWish = props.deleteFromWish;
  const LoadCurrentItem = props.LoadCurrentItem;

  const [inputQty, setinputQty] = useState(props.product.qty);
  const [subTotal, setsubTotal] = useState(0);

  useEffect(() => {
    setsubTotal(inputQty * props.product.price);
    }, [inputQty, props.product.price])

  const onChangeQuantity = (event) => {
    event.preventDefault();
    let btn = event.currentTarget;
    setinputQty(btn.value);
    adjustQuantity(props.product.id, parseInt(btn.value, 10));
    setsubTotal(inputQty * props.product.price);
  };

  return (
    <tr key={props.product.id}>
      <td onClick={() => LoadCurrentItem(props.product)}>
        <Link to={`/product/${props.product.id}`}>{props.product.song_name}</Link>
      </td>
      <td className="price-new">{props.product.price}$</td>
      <td>
        <input
          type="number"
          id="qty"
          name="qty"
          min="1"
          step="1"
          style={{ maxWidth: "50px" }}
          // defaultValue="1"
          value={inputQty}
          onChange={onChangeQuantity}
        />
      </td>
      <td className="subTotalShow">{subTotal}</td>
      <td>
        <Button
          variant="dark"
          size="sm"
        className="ms-2"
        onClick={(e) => deleteFromCart(e, props.product.id)}
      >
        <Icon.Trash></Icon.Trash>
      </Button>
      </td>
    </tr>
  );
}

const mapStatetoProps = (state) => {
  return {
    currentItem: state.rCart.currentItem,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (e, product, id) => dispatch(addToCart(e, product, id)),
    adjustQuantity: (id, value) => dispatch(adjustQuantity(id, value)),
    deleteFromCart: (e, id) => dispatch(deleteFromCart(e, id)),
    LoadCurrentItem: (product) => dispatch(LoadCurrentItem(product)),
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(ProductTrElement);
