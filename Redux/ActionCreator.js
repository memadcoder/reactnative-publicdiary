import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";
import axios from "axios";

export const fetchPosts = () => (dispatch) => {
  dispatch(postsLoading());
  // axios
  //   .get(baseUrl)
  //   .then((response) => {
  //     console.log("response");
  //     dispatch(addPosts(response));
  //   })
  //   .catch((error) => {
  //     console.log("statuscode", error);
  //     dispatch(postsFailed(error));
  //   });
  // alert("Hello");
  // return fetch(baseUrl)
  //   .then(
  //     (response) => {
  //       if (response.ok) {
  //         return response;
  //       } else {
  //         var error = new Error(
  //           "Error " + response.status + ": " + response.statusText
  //         );
  //         error.response = response;
  //         throw error;
  //       }
  //     },
  //     (error) => {
  //       var errmess = new Error(error.message);
  //       throw errmess;
  //     }
  //   )
  //   .then((response) => response.json())
  //   .then((posts) => dispatch(addPosts(posts)))
  //   .catch((error) => dispatch(postsFailed(error.message)));
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
