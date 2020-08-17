import * as ActionTypes from "./ActionTypes";

export const userEntries = (
  state = { isLoading: true, errMess: null, userEntry: [] },
  action
) => {
  switch (action.type) {
    case ActionTypes.LOAD_ENTRIES:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        userEntry: action.payload,
      };

    case ActionTypes.ENTRIES_LOADING:
      return { ...state, isLoading: true, errMess: null, userEntry: [] };

    case ActionTypes.ENTRIES_LOAD_FAILED:
      return { ...state, isLoading: false, errMess: action.payload };

    default:
      return state;
  }
};
