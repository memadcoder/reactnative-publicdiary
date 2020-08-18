import * as ActionTypes from "./ActionTypes";

export const registerUser = (state = { successRegister: false }, action) => {
  switch (action.type) {
    case ActionTypes.CREATE_USER_SUCCESS:
      return {
        ...state,
        successRegister: action.payload,
      };
    case ActionTypes.CREATE_USER_FAILED:
      return {
        ...state,
        successRegister: action.payload,
      };

    default:
      return state;
  }
};
