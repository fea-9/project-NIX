import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import App from './App'

class Router extends Component {

	render() {
		return (
			<div className="container">
				<Switch>
					<Route exact path="/" component={App} />
					<Route render={() => <div>404 NOT FOUND</div>} />
				</Switch>
			</div>
		);
	}
}

export default Router