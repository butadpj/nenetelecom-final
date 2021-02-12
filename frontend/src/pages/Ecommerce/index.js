import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./Ecommerce.css";
import Navtop from "../../components/Ecommerce/Navbars/Navtop";
import Home from "../../pages/Ecommerce/Home";
import Cart from "../../pages/Ecommerce/Cart";
import { updateCart } from "../../hooks/updateCart";

const Ecommerce = () => {
  const { update } = updateCart();
  update();

  return (
    <Router>
      <main className="ecommerce">
        <Navtop url="/store/home" />
        <Switch>
          <Route path="/store" exact>
            <Home />
          </Route>

          <Route path="/store/home" exact>
            <Home />
          </Route>

          <Route path="/store/cart/">
            <Cart />
          </Route>
        </Switch>
      </main>
    </Router>
  );
};

export default Ecommerce;
