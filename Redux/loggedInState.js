import * as ActionTypes from "./ActionTypes";

export const loggedInState = (state = { loggedInState: false }, action) => {
  switch (action.type) {
    case ActionTypes.SET_LOGGEDIN:
      return {
        ...state,
        loggedInState: action.payload,
      };
    case ActionTypes.UNSET_LOGGEDIN:
      return {
        ...state,
        loggedInState: action.payload,
      };

    default:
      return state;
  }
};
