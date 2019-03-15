import React from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from './serviceWorker';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import "./style/index.scss";

import store from "./store";

import Router from "./router";


ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<Router />
		</BrowserRouter>
	</Provider>,
	document.getElementById("root")
);

serviceWorker.unregister();
