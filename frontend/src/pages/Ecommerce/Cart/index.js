import React from "react";

import "./Cart.css";
import { Link } from "react-router-dom";
import Navbottom from "../../../components/Ecommerce/Navbars/Navbottom";
import CartItems from "../../../components/Ecommerce/CartItems";

const Cart = () => {
  return (
    <>
      <section className="cart">
        <div className="back-to-store">
          <Link to="/store/home">
            <i className="fas fa-arrow-circle-left"></i>
          </Link>
          <span>Back to store</span>
        </div>
        <hr />
        <CartItems />
        {/* Link index that is active - cart */}
      </section>
      <Navbottom link={2} />
    </>
  );
};

export default Cart;
