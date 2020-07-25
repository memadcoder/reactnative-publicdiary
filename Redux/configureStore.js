import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { highlights } from "./highlights";
import { posts } from "./posts";

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      posts,
      highlights,
    }),
    applyMiddleware(thunk, logger)
  );
  return store;
};
