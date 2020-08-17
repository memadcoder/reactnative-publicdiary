import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";
import axios from "axios";

export const fetchPosts = () => (dispatch) => {
  dispatch(postsLoading());

  axios
    .get(baseUrl + "entry")
    .then((response) => {
      // console.log("returned from server==>", response.data);
      dispatch(addPosts(response.data.entries));
    })
    .catch((error) => {
      console.log(error);
      dispatch(postsFailed(error));
    });
};

export const postsLoading = () => ({
  type: ActionTypes.POSTS_LOADING,
});

export const addPosts = (posts) => ({
  type: ActionTypes.ADD_POSTS,
  payload: posts,
});

export const postsFailed = (errmess) => ({
  type: ActionTypes.POSTS_FAILED,
  payload: errmess,
});

export const fetchHighlights = () => (dispatch) => {
  dispatch(highlightsLoading());

  return fetch(baseUrl + "highlights")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((highlights) => dispatch(addHighlights(highlights)))
    .catch((error) => dispatch(highlightsFailed(error.message)));
};

export const highlightsLoading = () => ({
  type: ActionTypes.HIGHLIGHTS_LOADING,
});

export const highlightsFailed = (errmess) => ({
  type: ActionTypes.HIGHLIGHTS_FAILED,
  payload: errmess,
});

export const addHighlights = (highlights) => ({
  type: ActionTypes.ADD_HIGHLIGHTS,
  payload: highlights,
});

export const createPost = (postDetails) => (dispatch) => {
  console.log("post Details=>", postDetails);
  axios
    .post(baseUrl + "entry", {
      heading: postDetails.heading,
      content: postDetails.content,
    })
    .then(function (response) {
      console.log("post to update=>", response.data.newEntry);
      dispatch(updatePosts(response.data.newEntry));
    })
    .catch(function (error) {
      console.log(error);
      dispatch(updateFailed(error));
    });

  // dispatch(addFavorite(dishId));
};

export const updatePosts = (update) => ({
  type: ActionTypes.UPDATE_POSTS,
  payload: update,
});

export const updateFailed = (errmess) => ({
  type: ActionTypes.UPDATE_POSTS_FAILED,
  payload: errmess,
});

export const fetchEntriesByUserName = (userName) => (dispatch) => {
  dispatch(entriesLoading());
  axios
    .get(baseUrl + "entry/" + userName)
    .then((response) => {
      console.log("user entries from server", response.data);
      dispatch(loadEntries(response.data.entries));
    })
    .catch((error) => {
      console.log(error);
      dispatch(entriesLoadFailed(error));
    });
};

export const entriesLoading = () => ({
  type: ActionTypes.ENTRIES_LOADING,
});

export const loadEntries = (entries) => ({
  type: ActionTypes.LOAD_ENTRIES,
  payload: entries,
});

export const entriesLoadFailed = (errmess) => ({
  type: ActionTypes.ENTRIES_LOAD_FAILED,
  payload: errmess,
});
