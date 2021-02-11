import React from "react";

import "./Cart.css";
import { Link } from "react-router-dom";
import Navbottom from "../../../components/Ecommerce/Navbars/Navbottom";
import CartItems from "../../../components/Ecommerce/CartItems";
import Button from "../../../components/Button";

const createCustomer = () => {
  fetch("http://127.0.0.1:8000/api/customers/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrftoken,
    },
    body: JSON.stringify({
      mobile_number: "09507867559",
      address: "dsadssada",
      first_name: "Paul",
      last_name: "Butad",
    }),
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
};

const Cart = () => {
  const handleCheckout = () => {
    createCustomer();
  };

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
        <Button
          type="button"
          text="Checkout"
          functionality={() => handleCheckout()}
        />
      </section>
      <Navbottom link={2} />
    </>
  );
};

export default Cart;
