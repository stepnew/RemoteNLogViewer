import React from "react";
import { RouteProps, Route, Redirect } from "react-router-dom";

const PrivateRoute: React.FunctionComponent<RouteProps> = React.memo(
  ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={props =>
          sessionStorage.getItem("token") ? (
            <Component {...props} />
          ) : (
            <Redirect to="/" />
          )
        }
      />
    );
  }
);

export default PrivateRoute;
