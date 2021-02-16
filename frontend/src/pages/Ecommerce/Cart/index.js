import React, { useEffect, useContext } from "react";

import "./Cart.css";
import { Link } from "react-router-dom";
import Navbottom from "../../../components/Ecommerce/Navbars/Navbottom";
import CartItems from "../../../components/Ecommerce/CartItems";
import Button from "../../../components/Button";
import { CartItemContext } from "../../../context/CartItemContext";

const Cart = () => {
  const [state] = useContext(CartItemContext);
  let totalCartPrice = state.totalCartPrice;
  let f_totalCartPrice = Number(totalCartPrice).toLocaleString();

  useEffect(() => {
    document.body.style.overflow = "auto";
  }, []);
  // const { data, setData } = useFetch("/api/customers/");

  const createCustomer = () => {
    // fetch("/api/customers/", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "X-CSRFToken": csrftoken,
    //   },
    //   body: JSON.stringify({
    //     mobile_number: "09507867559",
    //     address: "dsadssada",
    //     first_name: "Paul",
    //     last_name: "Butad",
    //   }),
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setData((prevData) => {
    //       return [...prevData, data];
    //     });
    //   });
  };

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
        <div className="checkout">
          <div className="total-cart-price">
            <span>Total:</span> ₱{f_totalCartPrice}.00
          </div>
          <Button
            type="button"
            text="Checkout"
            functionality={() => handleCheckout()}
          />
        </div>
      </section>
      <Navbottom link={2} />
    </>
  );
};

export default Cart;
