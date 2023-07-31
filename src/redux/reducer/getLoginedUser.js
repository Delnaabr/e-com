import { USER_LOGIN } from "../ActionType";

const initialState = {
  loggedInUser: null,
};

export const loginedUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        loggedInUser: action.payload,
      };

    default:
      return state;
  }
};
