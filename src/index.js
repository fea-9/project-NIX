import React from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from './serviceWorker';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import "./styles/index.scss";

import store from "./components/store";

import App from "./components/App/App";


ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>,
	document.getElementById("root")
);

serviceWorker.unregister();
