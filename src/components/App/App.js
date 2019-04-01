import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import AuthPage from "../Pages/AuthPage";
import { NavList } from "../Nav/NavList";
import { Social } from "../Social/Social";
import Sidebar from "../Sidebar/Sidebar";

class App extends Component {
  componentDidMount() {
    // const token = localStorage.getItem("token");

    // if (token) {
    //   const { setToken } = this.props;
    //   return setToken(token);
    // }
  }

  render() {
    return (
      <Switch>
      <Route exact path="/auth/:name" component={AuthPage} />
      <Route exact path="/dashboard" component={NavList} />
      <Route exact path="/documents" component={Social} />
      <Route exact path='/profile/' component={Sidebar} />
      <Route exact path='/community/:user' component={Sidebar} />
      <Route exact path='/search' component={Sidebar} />
      </Switch>
    );
  }
}

export default App;
