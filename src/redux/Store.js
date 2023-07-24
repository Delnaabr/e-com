import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { productReducer } from "./productListReducer";
import { loginReducer } from "./userLoginReducer";
import thunk from "redux-thunk";

const rootreducer = combineReducers({
  products: productReducer,
  userLogin: loginReducer,
});
const Store = configureStore({ reducer: rootreducer, middleware: [thunk] });
export default Store;
