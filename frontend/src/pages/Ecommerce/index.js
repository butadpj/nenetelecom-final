import React, { useState, useReducer } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./Ecommerce.css";
import CartItemContextProvider from "../../context/CartItemContext";
import Navtop from "../../components/Ecommerce/Navbars/Navtop";

import Home from "../../pages/Ecommerce/Home";
import Cart from "../../pages/Ecommerce/Cart";
const Ecommerce = () => {
  return (
    <Router>
      <CartItemContextProvider>
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
      </CartItemContextProvider>
    </Router>
  );
};

export default Ecommerce;
