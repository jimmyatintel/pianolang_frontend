import * as actionTypes from "./cart-types";
// Load order number from local storage
const loadOrderNumberFromLocalStorage = () => {
  try {
    const orderNumber = localStorage.getItem("orderNumber");
    return orderNumber ? parseInt(orderNumber, 10) : 0;
  } catch (e) {
    console.warn("Could not load order number from local storage", e);
    return 0;
  }
};

// Save order number to local storage
const saveOrderNumberToLocalStorage = (orderNumber) => {
  try {
    localStorage.setItem("orderNumber", orderNumber.toString());
  } catch (e) {
    console.warn("Could not save order number to local storage", e);
  }
};


// Load cart from local storage
const loadCartFromLocalStorage = () => {
  try {
    const serializedCart = localStorage.getItem("cart");
    if (serializedCart === null) {
      return [];
    }
    return JSON.parse(serializedCart);
  } catch (e) {
    console.warn("Could not load cart from local storage", e);
    return [];
  }
};

// Save cart to local storage
const saveCartToLocalStorage = (cart) => {
  try {
    const serializedCart = JSON.stringify(cart);
    localStorage.setItem("cart", serializedCart);
  } catch (e) {
    console.warn("Could not save cart to local storage", e);
  }
};

const INITIAL_STATE = {
  cart: loadCartFromLocalStorage(), // product with added qty
  currentItem: null,

};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      const item = action.payload.item;
      
      // alert(`${item.song_name} is added to cart successfully`);
      

      const inCart = state.cart.find((cartitem) =>
        cartitem.id === action.payload.id ? true : false
      );

      const updatedCart = inCart
        ? state.cart.map((cartitem) =>
          cartitem.id === action.payload.id
              ? { ...cartitem, qty: cartitem.qty + 1 }
              : cartitem
          )
        : [...state.cart, { ...item, qty: 1 }];

      saveCartToLocalStorage(updatedCart);
      console.log(updatedCart);
      return {
        ...state,
        cart: updatedCart,
      };
    case actionTypes.DELETE_FROM_CART:
      const filteredCart = state.cart.filter(
        (item) => item.id !== action.payload.id
      );

      saveCartToLocalStorage(filteredCart);

      return {
        ...state,
        cart: filteredCart,
      };
    case actionTypes.ADJUST_QUANTITY:
      const adjustedCart = state.cart.map((item) =>
        item.id === action.payload.id
          ? { ...item, qty: action.payload.qty }
          : item
      );

      saveCartToLocalStorage(adjustedCart);

      return {
        ...state,
        cart: adjustedCart,
        currentItem:
          state.currentItem && state.currentItem.id === action.payload.id
            ? { ...state.currentItem, qty: action.payload.qty }
            : state.currentItem,
      };
    case actionTypes.LOAD_CURRENT_ITEM:
      return {
        ...state,
        currentItem: action.payload,
      };
    case actionTypes.CLEAR_CART:
      localStorage.removeItem("cart");
      return {
        ...state,
        cart:
          state.cart.length === 0
            ? state.cart
            : state.cart.filter((item) => item.qty === 0),
      };
    case actionTypes.SAVE_ORDER_NUMBER:
      const orderNumber = action.payload;
      saveOrderNumberToLocalStorage(orderNumber);
      return {
        ...state,
        orderNumber: orderNumber,
      };
    case actionTypes.LOAD_ORDER_NUMBER:
      const loadedOrderNumber = loadOrderNumberFromLocalStorage();
      return {
        ...state,
        orderNumber: loadedOrderNumber,
      };
    default:
      return state;
    
  }
};

export default cartReducer;