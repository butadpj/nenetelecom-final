import React from "react";

import "./Cart.css";
import CartLogic from "./CartLogic";
import { Link } from "react-router-dom";
import Navbottom from "../../../components/Ecommerce/Navbars/Navbottom";
import CartItems from "../../../components/Ecommerce/CartItems";
import Button from "../../../components/Button";

const Cart = () => {
  const { state, f_totalCartPrice, djangoCurrentUser } = CartLogic();

  return (
    <>
      <section className="cart">
        <div className="cart-top-nav">
          <div className="back-to-store">
            <Link to="/store/home">
              <i className="fas fa-arrow-circle-left"></i>
            </Link>
            <span>
              to store <i className="fas fa-store-alt"></i>
            </span>
          </div>
          {djangoCurrentUser === "AnonymousUser" ? (
            <div className="view-orders-link">
              <a href="/store/accounts/login">
                <h5>Login to save orders {`>`}</h5>
              </a>
            </div>
          ) : state.completedOrders.length > 0 ? (
            <div className="view-orders-link">
              <Link to="/store/my-orders">
                <h5>View All Orders {`>`}</h5>
              </Link>
            </div>
          ) : null}
        </div>
        <hr />
        <CartItems />
        <div className="checkout-action">
          <div className="total-cart-price">
            <span>Total:</span> ₱{f_totalCartPrice}.00
          </div>
          <Link to="/store/checkout">
            <Button type="button" text="Checkout" />
          </Link>
        </div>
      </section>
      <Navbottom link={2} />
    </>
  );
};

export default Cart;
