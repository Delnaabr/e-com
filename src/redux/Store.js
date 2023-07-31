import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { productReducer } from "./reducer/productListReducer";
import { getAllUserReducer } from "./reducer/getAllUsersReducer";
import { loginedUserReducer } from "./reducer/getLoginedUser";
import { cartReducer } from "./reducer/cartItemReducer";
import { registerReducer } from "./reducer/userRegisterReducer";
import thunk from "redux-thunk";
import { orderSummaryResucer } from "./reducer/orderSummary";

const rootreducer = combineReducers({
  products: productReducer,
  userList: getAllUserReducer,
  registeredUser: registerReducer,
  loginedUser: loginedUserReducer,
  addToCart: cartReducer,
  buyNow: cartReducer,
  orderSummary: orderSummaryResucer
});
const Store = configureStore({ reducer: rootreducer, middleware: [thunk] });
export default Store;
