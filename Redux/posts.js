import * as ActionTypes from "./ActionTypes";
import { createReducer } from "@reduxjs/toolkit";

export const posts = (
  state = { isLoading: true, errMess: null, posts: [] },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_POSTS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        posts: action.payload,
      };

    case ActionTypes.POSTS_LOADING:
      return { ...state, isLoading: true, errMess: null, posts: [] };

    case ActionTypes.POSTS_FAILED:
      return { ...state, isLoading: false, errMess: action.payload };

    case ActionTypes.UPDATE_POSTS:
      return {
        ...state,
        posts: state.posts.concat(action.payload),
      };

    case ActionTypes.UPDATE_POSTS_FAILED:
      return { ...state, isLoading: false, errMess: action.payload };

    default:
      return state;
  }
};
