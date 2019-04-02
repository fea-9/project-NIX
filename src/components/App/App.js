import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import * as actions from "../actions/token";

import AuthPage from "../Pages/AuthPage";
import CommunityPage from "../Pages/CommunityPage";
import DashboardPage from "../Pages/DashboardPage";
import DocumentsPage from "../Pages/DocumentsPage";
import ProfilePage from "../Pages/ProfilePage";
import SearchPage from "../Pages/SearchPage";

class App extends Component {
  componentDidMount() {
    const token = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");

    console.log('token', token)
    console.log('refreshToken', refreshToken)

    if (token && refreshToken) {
      const { refreshTokens } = this.props;
      return refreshTokens({refresh_token: refreshToken});
    }
    console.log("this.props", this.props);
  }

  render() {
    return (
      <Switch>
        <Route path="/auth/:id" component={AuthPage} />
        <Route exact path="/profile" component={ProfilePage} />
        <Route exact path="/search" component={SearchPage} />
        <Route exact path="/dashboard" component={DashboardPage} />
        <Route exact path="/documents" component={DocumentsPage} />
        <Route exact path="/community/" component={CommunityPage} />
        <Route exact path="/community/:user" component={CommunityPage} />

        <Route render={() => <div>404</div>} />
      </Switch>
    );
  }
}

const mapDispatchToProps = { ...actions };

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(App)
);
