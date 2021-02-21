import React, { useRef, useEffect } from "react";

import "./Checkout.css";
import Navbottom from "../../../components/Ecommerce/Navbars/Navbottom";
import { Link } from "react-router-dom";
import CheckoutLogic from "./CheckoutLogic";
import Button from "../../../components/Button";
import handDownIcon from "../../../assets/svgs/hand-point-down-regular.svg";
import Paypal from "../../../components/Ecommerce/PayPal";
import closeIcon from "../../../assets/svgs/close.svg";

const Checkout = () => {
  const submitBtnContainer = useRef(null);

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
    isFormComplete,
    gcashInfo,
    showGcashInfo,
    closeGcashInfo,
    confirmModal,
    showConfirmModal,
    closeConfirmModal,
    processOrder,
  } = CheckoutLogic();

  let totalCartPrice = state.totalCartPrice;
  let f_totalCartPrice = Number(totalCartPrice).toLocaleString();

  useEffect(() => {
    document.body.style.overflow = "auto";
  }, []);

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
                  {isFormComplete ? (
                    <img src={handDownIcon} alt="hand-down-icon" />
                  ) : (
                    <Button type="submit" text="Continue" />
                  )}
                </div>
              </form>
            </div>
            {isFormComplete ? (
              <div className="payment-method">
                <h4 className="title">Select Payment Method:</h4>
                <div className="methods">
                  <div className="cod">
                    <Button
                      type="button"
                      text={
                        <>
                          <i className="fas fa-door-open"></i> Cash On Delivery
                        </>
                      }
                      functionality={showConfirmModal}
                    />
                  </div>
                  <div className="g-cash">
                    <Button
                      type="button"
                      text={
                        <>
                          <i className="fas fa-mobile-alt"></i> GCash
                        </>
                      }
                      functionality={showGcashInfo}
                    />
                  </div>

                  <div className="paypal">
                    <Paypal total={totalCartPrice} />
                  </div>
                </div>
              </div>
            ) : null}
            {gcashInfo ? (
              <div className="modal-wrapper">
                <div className="gcash-info">
                  <h4>First name: Wilda</h4>
                  <h4>Last name: Butad</h4>
                  <br />
                  <h4>Mobile number: 09206796099</h4>
                  <br />
                  <hr />
                  <br />
                  <div className="gcash-instructions">
                    <p>
                      After sending the total cash amount of the product you're
                      about to purchase. Please provide a proof of transaction
                      and send it on our FB page for order confirmation. Thank
                      you : )
                    </p>
                    <br />
                    <span>Link: </span>
                    <a
                      target="_blank"
                      href="https://www.facebook.com/nenetelecom"
                    >
                      Nenetelecom
                    </a>
                  </div>
                  <div className="modal-close-button">
                    <img
                      src={closeIcon}
                      alt=""
                      onClick={() => closeGcashInfo()}
                    />
                  </div>
                </div>
              </div>
            ) : null}
            {confirmModal ? (
              <div className="modal-wrapper">
                <div className="confirm-modal">
                  <h3>Do you want to complete your order?</h3>
                  <Button
                    type="button"
                    text="Ok"
                    functionality={processOrder(totalCartPrice)}
                  />
                  <div className="modal-close-button">
                    <img
                      src={closeIcon}
                      alt=""
                      onClick={() => closeConfirmModal()}
                    />
                  </div>
                </div>
              </div>
            ) : null}
          </>
        )}
      </section>
      <Navbottom />
    </>
  );
};

export default Checkout;
