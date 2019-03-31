import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import AuthPage from '../Pages/AuthPage';

import Auth from "../Auth/Auth"

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path='/auth' component={AuthPage}/>
      </Switch>
    );
  }
}

export default App;
