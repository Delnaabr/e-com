import {
  FAIL_REQUEST,
  GET_PRODUCT_LIST,
  DELETE_PRODUCT,
  ADD_NEW_PRODUCT,
} from "../ActionType";

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
    case ADD_NEW_PRODUCT:
      const newProductList = [...state.productList, action.payload];
      return {
        ...state,
        productList: newProductList,
      };
    case DELETE_PRODUCT:
      const updatedProducts = state.productList.filter(
        (product) => product.id !== action.payload
      );
      return {
        ...state,
        productList: updatedProducts,
      };
    default:
      return state;
  }
};
