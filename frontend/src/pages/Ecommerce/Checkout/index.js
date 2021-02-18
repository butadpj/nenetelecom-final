import React, { useContext } from "react";

import "./Checkout.css";
import Navbottom from "../../../components/Ecommerce/Navbars/Navbottom";
import CartItemsLogic from "../../../components/Ecommerce/CartItems/CartItemsLogic";
import { CartItemContext } from "../../../context/CartItemContext";

import { Link } from "react-router-dom";

const Checkout = () => {
  const { cartDisplayProducts, selectedItems } = CartItemsLogic();
  const [state] = useContext(CartItemContext);
  let totalCartPrice = state.totalCartPrice;
  let f_totalCartPrice = Number(totalCartPrice).toLocaleString();

  return (
    <>
      <section className="checkout">
        <div className="back-to-cart">
          <Link to="/store/cart">
            <i className="fas fa-arrow-circle-left"></i>
          </Link>
          <span>
            to cart <i className="fas fa-shopping-cart"></i>
          </span>
        </div>
        <hr />

        <div className="order-summary">
          <h3 className="title">Order Summary</h3>
          <hr />
          {selectedItems.map((item) => {
            const { id, image, name, brand, price, quantity, selected } = item;
            let f_price = Number(price).toLocaleString();
            return (
              <div className="item" key={id}>
                <div className="item-main">
                  <img
                    className="item-image"
                    width="100"
                    src={image[0]}
                    alt=""
                  />
                  <div className="item-info">
                    <div className="item-info-name">{name}</div>
                    <div className="item-info-brand">
                      <p>Brand: {brand}</p>
                    </div>
                    <div className="item-info-bottom">
                      <p className="price"> ₱ {f_price}.00</p>
                      <p className="quantity">x{quantity}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="total-cart-price">
            <span>Total:</span> ₱{f_totalCartPrice}.00
          </div>
        </div>

        <div className="billing-info-form">
          <div className="customer-info"></div>
          <div className="shipping-info"></div>
        </div>
      </section>
      <Navbottom />
    </>
  );
};

export default Checkout;
