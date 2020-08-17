import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { highlights } from "./highlights";
import { posts } from "./posts";
import { userEntries } from "./userEntries";

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      posts,
      highlights,
      userEntries,
    }),
    applyMiddleware(thunk, logger)
  );
  return store;
};
