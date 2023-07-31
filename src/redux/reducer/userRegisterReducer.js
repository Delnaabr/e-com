import { ADD_NEW_USER } from "../ActionType";

const initialState = {
  registeredUser: [],
};

export const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NEW_USER:
      return {
        ...state,
        registeredUser: action.payload,
      };
    default:
      return state;
  }
};
