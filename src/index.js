import 'react-app-polyfill/ie9';
import "core-js";

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import App from "./components/App/App";
import { refreshTokens } from "./components/actions/token";
import store from "./components/store";

import * as serviceWorker from "./serviceWorker";

import "./styles/index.scss";

const token = localStorage.getItem("access_token");
const refreshToken = localStorage.getItem("refresh_token");

if (token && refreshToken) {
  store.dispatch(refreshTokens({ refresh_token: refreshToken }));
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
