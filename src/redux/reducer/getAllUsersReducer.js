import {  GET_USER_LIST } from "../ActionType";

const initialState = {
  getAllUser: [],
};

export const getAllUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_LIST:
      return {
        errMessage: "",
        getAllUser: action.payload,
      };
    default:
      return state;
  }
};
