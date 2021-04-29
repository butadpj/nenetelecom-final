import React from "react";

import "./Cart.css";
import CartLogic from "./CartLogic";
import { Link } from "react-router-dom";
import Navbottom from "../../../components/Ecommerce/Navbars/Navbottom";
import CartItems from "../../../components/Ecommerce/CartItems";
import Button from "../../../components/Button";
import BackTo from "../../../components/Ecommerce/BackTo";

const Cart = () => {
  const { totalCartPrice } = CartLogic();

  return (
    <>
      <section className="cart">
        <BackTo
          linkText="to store"
          link="/store"
          icon={<i className="fas fa-store-alt"></i>}
          showOrdersLink={true}
        />
        <hr />
        <CartItems />
        <div className="checkout-action-wrapper">
          <div className="checkout-action">
            <div className="total-cart-price">
              <span>Total:</span> ₱{totalCartPrice}.00
            </div>
            <Link to="/store/checkout">
              <Button type="button" text="Checkout" />
            </Link>
          </div>
        </div>
      </section>
      <Navbottom link={2} />
    </>
  );
};

export default Cart;
