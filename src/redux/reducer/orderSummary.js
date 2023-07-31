import { ORDER_SUMMARY } from "../ActionType";

const initialState = {
 orderSummary:[]
};

export const orderSummaryResucer = (state = initialState, action) => {
  switch (action.type) {
      case ORDER_SUMMARY:
      return {
        ...state,
        orderSummary: action.payload
      };
    default:
      return state;
  }
};


