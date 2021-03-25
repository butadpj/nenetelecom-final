import React, { useContext, useEffect } from "react";
import { Route, Switch } from "react-router-dom";

import Navtop from "../../../components/Ecommerce/Navbars/Navtop";
import Home from "../../../pages/Ecommerce/Home";
import Cart from "../../../pages/Ecommerce/Cart";
import Checkout from "../../../pages/Ecommerce/Checkout";
import Orders from "../../../pages/Ecommerce/Orders";
import { CartItemContext } from "../../../context/CartItemContext";

const EcommerceView = () => {
  const [state] = useContext(CartItemContext);

  let cartNotif = state.cartNotif;

  useEffect(() => {
    if (cartNotif === 0) {
      document.title = `Nenetelecom | Store`;
      return;
    }
    document.title = `(${cartNotif}) Nenetelecom | Store`;
  }, [cartNotif]);

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

        <Route path="/store/my-orders/">
          <Orders />
        </Route>
      </Switch>
    </>
  );
};

export default EcommerceView;
