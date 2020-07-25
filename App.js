import React from "react";
import Main from "./Components/MainComponent";

import { ConfigureStore } from "./Redux/configureStore";
import { Provider } from "react-redux";
const store = ConfigureStore();

export default function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
