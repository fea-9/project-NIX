import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { Loading } from "../HOC/Loading";

const PrivateRoute = ({ component: Component, user, isFetching, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        return isFetching || user ? (
          <Loading flag={isFetching} children={<Component {...props} />} />
        ) : (
          <Redirect to="/auth/signin" />
        );
      }}
    />
  );
};

const mapStateToProps = state => ({
  user: state.auth.user,
  isFetching: state.auth.isFetching_token
});

export default connect(mapStateToProps)(PrivateRoute);
