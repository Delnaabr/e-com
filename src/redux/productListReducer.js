import { FAIL_REQUEST, GET_PRODUCT_LIST } from "./ActionType";

const initialState = {
  productList: [],
  errMessage: "",
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case FAIL_REQUEST:
      return {
        ...state,
        loading: false,
        errMessage: action.payload,
      };
    case GET_PRODUCT_LIST:
      return {
        errMessage: "",
        productList: action.payload,
      };
    default:
      return state;
  }
};
