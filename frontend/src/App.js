import React from "react";
import Landing from "./pages/Landing/";
import Ecommerce from "./pages/Ecommerce/";

import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Landing />
        </Route>
        <Route path="/store/">
          <Ecommerce />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
