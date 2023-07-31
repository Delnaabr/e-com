import {
  FAIL_REQUEST,
  GET_PRODUCT_LIST,
  ADD_NEW_USER,
  DELETE_PRODUCT,
  ADD_NEW_PRODUCT,
  GET_USER_LIST,
  USER_LOGIN,
  ADD_TO_CART,
  PURCHASE_PRODUCT,
  ORDER_SUMMARY,
} from "./ActionType";
import { RegisteredUserDetail, getProducts } from "../utils/utils";
import axios from "axios";

export const failRequest = (error) => {
  return {
    type: FAIL_REQUEST,
    payload: error,
  };
};

export const getAllUser = (data) => {
  return {
    type: GET_USER_LIST,
    payload: data,
  };
};

export const userLogin = (userDetails) => {
  return {
    type: USER_LOGIN,
    payload: userDetails,
  };
};

export const getProductList = (data) => {
  return {
    type: GET_PRODUCT_LIST,
    payload: data,
  };
};

export const addNewUser = (data) => {
  return {
    type: ADD_NEW_USER,
    payload: data,
  };
};

export const addNewProduct = (data) => {
  return {
    type: ADD_NEW_PRODUCT,
    payload: data,
  };
};

export const deleteProduct = (productId) => {
  return {
    type: DELETE_PRODUCT,
    payload: productId,
  };
};

export const addToCart = (item) => {
  return {
    type: ADD_TO_CART,
    payload: item,
  };
};

export const buyNow = (item) => {
  return {
    type: PURCHASE_PRODUCT,
    payload: item,
  };
};

export const orderSummary = (item) => {
  return {
    type: ORDER_SUMMARY,
    payload: item,
  };
};

export const FetchProductList = () => {
  return (dispatch) => {
    dispatch(getProductList([]));
    axios
      .get(getProducts)
      .then((res) => {
        const productList = res.data;
        dispatch(getProductList(productList));
      })
      .catch((err) => {
        dispatch(failRequest(err.message));
      });
  };
};

export const fetchUserList = () => {
  return (dispatch) => {
    dispatch(getAllUser([]));
    axios
      .get(RegisteredUserDetail)
      .then((res) => {
        const logginedUser = res.data;
        dispatch(getAllUser(logginedUser));
      })
      .catch((err) => {
        dispatch(failRequest(err.message));
      });
  };
};
