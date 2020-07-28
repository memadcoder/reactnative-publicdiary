import React from "react";
import Main from "./Components/MainComponent";

import { Provider as PaperProvider } from "react-native-paper";
import { ConfigureStore } from "./Redux/configureStore";
import { Provider } from "react-redux";
const store = ConfigureStore();

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <Main />
      </PaperProvider>
    </Provider>
  );
}
