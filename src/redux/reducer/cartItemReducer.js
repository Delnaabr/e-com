import { ADD_TO_CART, PURCHASE_PRODUCT } from "../ActionType";

const initialState = {
  cartItems: [],
  buyNow:[]
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };
      case PURCHASE_PRODUCT:
      return {
        ...state,
        buyNow: action.payload
      };
    default:
      return state;
  }
};


