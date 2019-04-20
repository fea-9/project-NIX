import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Loading } from "../HOC/Loading";

const PrivateRoute = ({
  component: Component,
  user,
  isFetching,
  interseptrorWorking,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props => {
        return isFetching || user ? (
          <Loading
            flag={isFetching && !interseptrorWorking}
            children={<Component {...props} />}
          />
        ) : (
          <Redirect to="/auth/signin" />
        );
      }}
    />
  );
};

const mapStateToProps = state => ({
  user: state.auth.user,
  isFetching: state.auth.isFetching_token,
  interseptrorWorking: state.auth.interseptrorWorking
});

export default connect(mapStateToProps)(PrivateRoute);

PrivateRoute.propTypes = {
  user: PropTypes.object,
  isFetching: PropTypes.bool
};
