import React from "react";
import { Switch, Route } from "react-router-dom";

import LoginPage from "../pages/login";
import ViewerPage from "../pages/viewer";

const Routes: React.FunctionComponent = React.memo(() => (
  <Switch>
    <Route path="/" exact component={LoginPage} />
    <Route path="/viewer" component={ViewerPage} />
  </Switch>
));

export default Routes;
