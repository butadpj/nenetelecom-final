import React, { useContext, useEffect } from "react";
import { Route, Switch } from "react-router-dom";

import Navtop from "../../../components/Ecommerce/Navbars/Navtop";
import Home from "../../../pages/Ecommerce/Home";
import Cart from "../../../pages/Ecommerce/Cart";
import Checkout from "../../../pages/Ecommerce/Checkout";

const EcommerceView = () => {
  return (
    <>
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

        <Route path="/store/checkout/">
          <Checkout />
        </Route>
      </Switch>
    </>
  );
};

export default EcommerceView;
