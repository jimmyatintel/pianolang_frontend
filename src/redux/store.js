import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import cartReducer from "./reducers/cart-reducer";
import userReducer from './reducers/user-reducer';
const rootReducer = combineReducers({
  rCart: cartReducer,
  user: userReducer,
});
const persistConfig = {
  key: 'root',
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, composeWithDevTools());

const persistor = persistStore(store);
export { store, persistor };
