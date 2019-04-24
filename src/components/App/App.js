import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import PropTypes from "prop-types";

import { mobileSize } from "../actions/resize";

import PrivateRoute from "../PrivateRouter/PrivateRouter";

import AuthPage from "../Pages/AuthPage";
import CommunityPage from "../Pages/CommunityPage";
import DashboardPage from "../Pages/DashboardPage";
import DocumentsPage from "../Pages/DocumentsPage";
import ProfilePage from "../Pages/ProfilePage";
import SearchPage from "../Pages/SearchPage";
import Error from "../Error/Error";

const routes = [
  {
    path: "/auth/:id",
    component: AuthPage,
    privateRoute: false,
    exact: true
  },
  {
    path: "/profile",
    component: ProfilePage,
    privateRoute: true,
    exact: true
  },
  {
    path: "/search",
    component: SearchPage,
    privateRoute: true,
    exact: true
  },
  {
    path: "/dashboard",
    component: DashboardPage,
    privateRoute: true,
    exact: true
  },
  {
    path: "/documents",
    component: DocumentsPage,
    privateRoute: true,
    exact: true
  },
  {
    path: "/community",
    component: CommunityPage,
    privateRoute: true,
    exact: true
  }
];
class App extends Component {
  static propTypes = {
    mobileSize: PropTypes.func,
    mobile: PropTypes.bool
  };

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
        {routes.map(route => {
          const { path, component, privateRoute, exact } = route;
          return privateRoute ? (
            <PrivateRoute
              exact={exact}
              path={path}
              component={component}
              key={path}
            />
          ) : (
            <Route exact={exact} path={path} component={component} key={path} />
          );
        })}
        <Route render={() => <Error description="404 page not found" />} />
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
