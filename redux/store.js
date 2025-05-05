import { createStore, combineReducers } from "redux";

import ReduxCartCounter from "./reducers/cartCounter";
import ReduxCart from "./reducers/cart";
import CartTotalPrice from "./reducers/cartTotal";
import { composeWithDevTools } from 'redux-devtools-extension';

const rootReducer = combineReducers({
    cc: ReduxCartCounter,
    rt: ReduxCart,
    ct: CartTotalPrice,
});

const store = createStore(rootReducer, composeWithDevTools());

export default store;