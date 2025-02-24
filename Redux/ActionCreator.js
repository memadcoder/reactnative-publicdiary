import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";
import axios from "axios";
import { Alert } from "react-native";

export const fetchPosts = (token) => (dispatch) => {
  console.log("token form fetchPosts");
  dispatch(postsLoading());
  axios
    .get(baseUrl + "entry", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "Application/json",
        Authorization: `Bearer ${token}`,
      },
    })
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
      // console.log("highlights from server=>", response.data.highLights);
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

export const createPost = (postDetails, token) => (dispatch) => {
  // console.log("post Details=>", postDetails);
  console.log("token form create post", token);
  axios
    .post(baseUrl + "entry", {
      heading: postDetails.heading,
      content: postDetails.content,
      name: postDetails.name,
      username: postDetails.username,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "Application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then(function (response) {
      response.data.newEntry.by = {
        name: postDetails.name,
        username: postDetails.username,
      };
      // console.log("post to update=>", response.data.newEntry);
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
      // console.log("user entries from server", response.data);
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
  // console.log("post Id to highlight=>", postId);
  // console.log("post Details to highlight", postDetails);
  axios
    .post(baseUrl + "entry/highlight/" + postId)
    .then(function (response) {
      response.data.newEntry.highlightedEntry = postDetails.highlightedEntry;
      response.data.newEntry.highlightedBy = postDetails.highlightedBy;

      // console.log("highlight post to update=>", response.data.newEntry);
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

export const registerNewUser = (userDetails, navigation) => (dispatch) => {
  console.log("userDetails before posting", userDetails);
  console.log("navi", navigation);
  axios
    .post(baseUrl + "user/signup/", {
      name: userDetails.name,
      userName: userDetails.userName,
      email: userDetails.email,
      password: userDetails.password,
    })
    .then(function (response) {
      console.log(response.data);
      // alert(response.data.message);
      var message = response.data.message;
      Alert.alert(
        "Registration",
        message,
        [
          {
            text: "Ok",
            onPress: () => navigation.navigate("SignIn"),
          },
        ],
        { cancelable: false }
      );
      dispatch(successMessage());
    })
    .catch(function (error) {
      Alert.alert(
        "Registration",
        "Registration Failed",
        [
          {
            text: "Ok",
          },
        ],
        { cancelable: false }
      );
      dispatch(faileureMessage());
    });
};

export const successMessage = () => ({
  type: ActionTypes.CREATE_USER_SUCCESS,
  payload: true,
});

export const faileureMessage = () => ({
  type: ActionTypes.CREATE_USER_FAILED,
  payload: false,
});

export const loginUser = (loginDetails, navigation) => (dispatch) => {
  console.log("userDetails before posting", loginDetails);
  console.log("navi", navigation);
  axios
    .post(baseUrl + "user/login/", {
      userNameOrEmail: loginDetails.userNameOrEmail,
      password: loginDetails.password,
    })
    .then(function (response) {
      console.log(response.data);
      navigation.navigate("Home"), dispatch(loginSuccess(response.data));
      dispatch(setLogin());
    })
    .catch(function (error) {
      console.log(error);
      // dispatch(loginFailure());
    });
};

export const loginSuccess = (data) => ({
  type: ActionTypes.LOGIN_USER_SUCCESS,
  payload: data,
});

export const loginFailure = () => ({
  type: ActionTypes.LOGIN_USER_FAILED,
});

export const setLogin = () => ({
  type: ActionTypes.SET_LOGGEDIN,
  payload: true,
});

export const unsetLogin = () => ({
  type: ActionTypes.UNSET_LOGGEDIN,
  payload: false,
});

export const blockUser = (userId, token) => (dispatch) => {
  console.log("Details before blocking", userId, token);
  axios
    .post(baseUrl + "user/block/" + userId, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(function (response) {
      console.log("blocking succeded");
      fetchPosts(token);
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const reportUser = (userId, token) => (dispatch) => {
  console.log("Details before report", userId, token);
  axios
    .post(baseUrl + "user/report/" + userId, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(function (response) {
      console.log("reporting succeded");
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const reportPost = (postId, reportedCase, token) => (dispatch) => {
  console.log("Details before report", postId, token);
  axios
    .post(baseUrl + "entry/report/" + postId, {
      reportedCase: reportedCase,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(function (response) {
      console.log("reporting succeded");
    })
    .catch(function (error) {
      console.log(error);
    });
};
