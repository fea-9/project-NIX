import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import AuthPage from '../Pages/AuthPage';

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
