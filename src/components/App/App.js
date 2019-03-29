import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import AuthPage from '../Pages/AuthPage';


class App extends Component {

  componentDidMount() {
    const token = localStorage.getItem("token");

		if (token) {
			const { setToken } = this.props;
			return setToken(token);
		}
  }

  render() {
    return (
      <Switch>
        <Route path='/auth' component={AuthPage}/>
      </Switch>
    );
  }
}

export default App;
