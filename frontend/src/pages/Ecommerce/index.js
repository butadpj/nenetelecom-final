import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import "./Ecommerce.css";
import EcommerceView from "./EcommerceView";

import CustomerInfoContextProvider from "../../context/CustomerInfoContext";
import ProductContextProvier from "../../context/ProductContext";
import CartItemContextProvider from "../../context/CartItemContext";

const Ecommerce = () => {
  return (
    <Router>
      <CustomerInfoContextProvider>
        <ProductContextProvier>
          <CartItemContextProvider>
            <main className="ecommerce">
              <EcommerceView />
            </main>
          </CartItemContextProvider>
        </ProductContextProvier>
      </CustomerInfoContextProvider>
    </Router>
  );
};

export default Ecommerce;
