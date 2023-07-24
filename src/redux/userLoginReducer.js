import { FAIL_REQUEST, USER_LOGIN } from "./ActionType";

const initialState = {
  errMessage: "",
  logginedUser: [],
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case FAIL_REQUEST:
      return {
        ...state,
        loading: false,
        errMessage: action.payload,
      };
    case USER_LOGIN:
      return {
        errMessage: "",
        logginedUser: action.payload,
      };
    default:
      return state;
  }
};
