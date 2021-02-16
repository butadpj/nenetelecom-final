import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import "./Ecommerce.css";
import EcommerceView from "./EcommerceView";

import CartItemContextProvider from "../../context/CartItemContext";

const Ecommerce = () => {
  return (
    <Router>
      <CartItemContextProvider>
        <main className="ecommerce">
          <EcommerceView />
        </main>
      </CartItemContextProvider>
    </Router>
  );
};

export default Ecommerce;
