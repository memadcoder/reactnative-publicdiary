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

export const fetchHighlightsByUserName = (username) => (dispatch) => {
  dispatch(highlightsLoading());

  axios
    .get(baseUrl + "entry/highlight/" + username)
    .then(function (response) {
      console.log("highlights from server=>", response.data.highLights);
      dispatch(addHighlights(response.data.highLights));
    })
    .catch(function (error) {
      console.log(error);
      dispatch(highlightsFailed(error));
    });
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
      response.data.newEntry.by = {
        name: postDetails.name,
        username: postDetails.username,
      };
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

export const createHighlight = (postId, postDetails) => (dispatch) => {
  console.log("post Id to highlight=>", postId);
  console.log("post Details to highlight", postDetails);
  axios
    .post(baseUrl + "entry/highlight/" + postId)
    .then(function (response) {
      response.data.newEntry.highlightedEntry = postDetails.highlightedEntry;
      response.data.newEntry.highlightedBy = postDetails.highlightedBy;

      console.log("highlight post to update=>", response.data.newEntry);
      dispatch(updateHighlights(response.data.newEntry));
    })
    .catch(function (error) {
      console.log(error);
      dispatch(updateHighlightFailed(error));
    });

  // dispatch(addFavorite(dishId));
};

export const updateHighlights = (update) => ({
  type: ActionTypes.UPDATE_HIGHLIGHTS,
  payload: update,
});

export const updateHighlightFailed = (errmess) => ({
  type: ActionTypes.UPDATE_HIGHLIGHTS_FAILED,
  payload: errmess,
});
