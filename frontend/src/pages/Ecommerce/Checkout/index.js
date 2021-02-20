import React, { useContext, useState } from "react";

import "./Checkout.css";
import Navbottom from "../../../components/Ecommerce/Navbars/Navbottom";
import { Link } from "react-router-dom";
import CheckoutLogic from "./CheckoutLogic";
import Button from "../../../components/Button";

const Checkout = () => {
  const {
    state,
    customerInfo,
    setCustomerInfo,
    shippingInfo,
    setShippingInfo,
    selectedItems,
    handleChange,
    handleSubmit,
    djangoCurrentUser,
  } = CheckoutLogic();

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

        {selectedItems.length === 0 ? (
          <div className="helper">
            <span>Select an item to checkout...</span>
          </div>
        ) : (
          <>
            <div className="order-summary">
              <h3 className="title">Order Summary</h3>
              <hr />
              {selectedItems.map((item) => {
                const {
                  id,
                  image,
                  name,
                  brand,
                  price,
                  quantity,
                  selected,
                } = item;
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
            <div className="billing-info">
              <form className="billing-info-form" onSubmit={handleSubmit}>
                {djangoCurrentUser === "AnonymousUser" ? (
                  <>
                    <section className="customer-info">
                      <h3 className="title">Customer Info</h3>
                      <div className="form-field">
                        <label htmlFor="lastName">First name: </label>
                        <input
                          required
                          type="text"
                          placeholder="John"
                          name="firstName"
                          value={customerInfo.firstName}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-field">
                        <label htmlFor="lastName">Last name: </label>
                        <input
                          required
                          type="text"
                          placeholder="Doe"
                          name="lastName"
                          value={customerInfo.lastName}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-field">
                        <label htmlFor="address">Mobile number: </label>
                        <input
                          required
                          type="text"
                          placeholder="09xxxxxxxxx"
                          name="mobileNumber"
                          value={customerInfo.mobileNumber}
                          onChange={handleChange}
                        />
                      </div>
                    </section>
                    <hr />
                  </>
                ) : null}

                <section className="shipping-info">
                  <h3 className="title">Shipping Info</h3>
                  <div className="form-field">
                    <label htmlFor="address">Address: </label>
                    <input
                      required
                      type="text"
                      placeholder="9100 St. Peter street..."
                      name="address"
                      value={shippingInfo.address}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="city">City: </label>
                    <input
                      required
                      type="text"
                      placeholder="Antipolo City"
                      name="city"
                      value={shippingInfo.city}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="province">Province: </label>
                    <input
                      required
                      type="text"
                      placeholder="Rizal"
                      name="province"
                      value={shippingInfo.province}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="zipCode">Zip code: </label>
                    <input
                      type="text"
                      placeholder="1870"
                      name="zipCode"
                      value={shippingInfo.zipCode}
                      onChange={handleChange}
                    />
                  </div>
                </section>
                <div className="form-submit-btn">
                  <Button type="submit" text="Continue" />
                </div>
              </form>
            </div>
          </>
        )}
      </section>
      <Navbottom />
    </>
  );
};

export default Checkout;
