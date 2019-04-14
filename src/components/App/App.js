import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { mobileSize } from "../actions/resize";

import PrivateRoute from "../PrivateRouter/PrivateRouter";

import AuthPage from "../Pages/AuthPage";
import CommunityPage from "../Pages/CommunityPage";
import DashboardPage from "../Pages/DashboardPage";
import DocumentsPage from "../Pages/DocumentsPage";
import ProfilePage from "../Pages/ProfilePage";
import SearchPage from "../Pages/SearchPage";
import Error from "../Error/Error"

class App extends Component {
  resize = () => {
    const { mobileSize, mobile } = this.props;

    if (window.innerWidth >= 768 && mobile) {
      mobileSize(false);
    }

    if (window.innerWidth < 768 && !mobile) {
      mobileSize(true);
    }
  };

  componentDidMount() {
    window.addEventListener("resize", this.resize);
    this.resize();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resize);
  }

  render() {
    return (
      <Switch>
        <Redirect exact from="/" to="/dashboard?period=day" />
        <Route path="/auth/:id" component={AuthPage} />
        <PrivateRoute exact path="/profile" component={ProfilePage} />
        <PrivateRoute exact path="/search" component={SearchPage} />
        <PrivateRoute exact path="/dashboard" component={DashboardPage} />
        <PrivateRoute exact path="/documents" component={DocumentsPage} />
        <PrivateRoute exact path="/community" component={CommunityPage} />

        <Route render={() => <Error description="404 page not found"/>} />
      </Switch>
    );
  }
}

const mapStateToProps = state => ({
  mobile: state.resize.mobile
});

export default withRouter(
  connect(
    mapStateToProps,
    { mobileSize }
  )(App)
);
