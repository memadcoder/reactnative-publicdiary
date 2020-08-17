import * as ActionTypes from "./ActionTypes";

export const highlights = (
  state = { isLoading: true, errMess: null, highlights: [] },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_HIGHLIGHTS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        highlights: action.payload,
      };

    case ActionTypes.HIGHLIGHTS_LOADING:
      return { ...state, isLoading: true, errMess: null, highlights: [] };

    case ActionTypes.HIGHLIGHTS_FAILED:
      return { ...state, isLoading: false, errMess: action.payload };

    case ActionTypes.UPDATE_HIGHLIGHTS:
      return {
        ...state,
        highlights: state.highlights.concat(action.payload),
      };

    case ActionTypes.UPDATE_HIGHLIGHTS_FAILED:
      return { ...state, isLoading: false, errMess: action.payload };

    default:
      return state;
  }
};
