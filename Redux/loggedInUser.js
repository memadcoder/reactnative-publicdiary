import * as ActionTypes from "./ActionTypes";

export const loggedInUser = (state = { user: {} }, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    case ActionTypes.LOGIN_USER_FAILED:
      return {
        ...state,
        user: {},
      };

    default:
      return state;
  }
};
