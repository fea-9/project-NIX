import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, token, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      const token = localStorage.getItem("token");
      if (token === null) {
        return <Redirect to="auth" />;
      }

      return <Component {...props} />;
    }}
  />
);

export default PrivateRoute;

