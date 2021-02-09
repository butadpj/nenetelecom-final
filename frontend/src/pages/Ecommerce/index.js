import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./Ecommerce.css";
import Home from "./Home";
import Cart from "./Cart";
import Navtop from "../../components/Ecommerce/Navbars/Navtop";

const Ecommerce = () => {
  return (
    <Router>
      <main className="ecommerce">
        <Navtop url="/store/home" />
        <Switch>
          <Route path="/store/" component={Home} exact />
          <Route path="/store/home" component={Home} exact />
          <Route path="/store/cart" component={Cart} />
        </Switch>
      </main>
    </Router>
  );
};

export default Ecommerce;
