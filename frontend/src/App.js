import React from "react";
import Landing from "./pages/Landing/";
import Ecommerce from "./pages/Ecommerce/";

import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import CartItemContextProvider from "./context/CartItemContext";

const App = () => {
  return (
    <Router>
      <CartItemContextProvider>
        <div className="App">
          <Switch>
            <Route path="/" exact>
              <Landing />
            </Route>
            <Route path="/store/">
              <Ecommerce />
            </Route>
          </Switch>
        </div>
      </CartItemContextProvider>
    </Router>
  );
};

export default App;
