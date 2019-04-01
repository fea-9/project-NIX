import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import AuthPage from "../Pages/AuthPage";
import CommunityPage from "../Pages/CommunityPage";
import DashboardPage from "../Pages/DashboardPage";
import DocumentsPage from "../Pages/DocumentsPage";
import ProfilePage from "../Pages/ProfilePage";
import SearchPage from "../Pages/SearchPage";

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
        <Route exact path="/dashboard" component={DashboardPage} />
        <Route exact path="/documents" component={DocumentsPage} />
        <Route exact path="/profile/" component={ProfilePage} />
        <Route exact path="/community/:user" component={CommunityPage} />
        <Route exact path="/search" component={SearchPage} />
      </Switch>
    );
  }
}

export default App;
