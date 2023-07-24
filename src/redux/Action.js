import axios from "axios";
import { FAIL_REQUEST, GET_PRODUCT_LIST, USER_LOGIN } from "./ActionType";
import { RegisteredUserDetail, getProducts } from "../utils/utils";

export const userLogin = () => {
  return {
    type: USER_LOGIN,
  };
};

export const failRequest = (error) => {
  return {
    type: FAIL_REQUEST,
    payload: error,
  };
};

export const getProductList = (data) => {
  return {
    type: GET_PRODUCT_LIST,
    payload: data,
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

export const fetchUserList =()=>{
    return(dispatch)=>{
        dispatch(userLogin([]));
        axios.get(RegisteredUserDetail)
        .then((res)=>{
            const logginedUser =res.data;
            dispatch(userLogin(logginedUser));
            console.log("looog",logginedUser)
        })
        .catch((err) =>{
            dispatch(failRequest(err.message))
        })
    }
}