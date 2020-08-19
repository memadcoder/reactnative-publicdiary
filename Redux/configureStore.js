import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { highlights } from "./highlights";
import { posts } from "./posts";
import { userEntries } from "./userEntries";
import { registerUser } from "./registerUsers";
import { loggedInUser } from "./loggedInUser";
import { loggedInState } from "./loggedInState";

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      posts,
      highlights,
      userEntries,
      registerUser,
      loggedInUser,
      loggedInState,
    }),
    applyMiddleware(thunk, logger)
  );
  return store;
};
