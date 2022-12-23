import React from "react";
import * as ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import { createStore, applyMiddleware } from "redux";

import rootReducer from "./reducers";

import App from "./App";
import thunk from "redux-thunk";

const store = createStore(
  rootReducer,

  applyMiddleware(thunk)
);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
