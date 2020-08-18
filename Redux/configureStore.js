import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { highlights } from "./highlights";
import { posts } from "./posts";
import { userEntries } from "./userEntries";
import { registerUser } from "./registerUsers";
import { loggedInUser } from "./loggedInUser";

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      posts,
      highlights,
      userEntries,
      registerUser,
      loggedInUser,
    }),
    applyMiddleware(thunk, logger)
  );
  return store;
};
