import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import "./Ecommerce.css";
import EcommerceView from "./EcommerceView";

import ProductContextProvier from "../../context/ProductContext";
import CartItemContextProvider from "../../context/CartItemContext";

const Ecommerce = () => {
  return (
    <Router>
      <ProductContextProvier>
        <CartItemContextProvider>
          <main className="ecommerce">
            <EcommerceView />
          </main>
        </CartItemContextProvider>
      </ProductContextProvier>
    </Router>
  );
};

export default Ecommerce;
