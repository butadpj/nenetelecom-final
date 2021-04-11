import React, { useEffect } from "react";

import "./Checkout.css";
import Navbottom from "../../../components/Ecommerce/Navbars/Navbottom";
import CheckoutLogic from "./CheckoutLogic";
import Button from "../../../components/Button";
import handDownIcon from "../../../assets/svgs/hand-point-down-regular.svg";
import Paypal from "../../../components/Ecommerce/PayPal";
import closeIcon from "../../../assets/svgs/close.svg";
import BackTo from "../../../components/Ecommerce/BackTo";
import ModalWrapper from "../../../components/Ecommerce/ModalWrapper";
import HelpText from "../../../components/Ecommerce/HelpText";

const Checkout = () => {
  const {
    selectedItems,
    customerInfo,
    shippingInfo,
    handleCustomerInfoChange,
    handleShippingInfoChange,
    handleSubmit,
    isFormComplete,
    gcashInfo,
    showGcashInfo,
    closeGcashInfo,
    confirmModal,
    showConfirmModal,
    closeConfirmModal,
    processOrder,
    alertModal,
    time,
    validity,
    errorMessage,
    totalCartPrice,
    isAuthenticated,
  } = CheckoutLogic();

  let f_totalCartPrice = Number(totalCartPrice).toLocaleString();

  useEffect(() => {
    document.body.style.overflow = "auto";
  }, []);

  return (
    <>
      <section className="checkout">
        <BackTo
          linkText="to cart"
          link="/store/cart"
          icon={<i className="fas fa-shopping-cart"></i>}
        />
        <hr />
        {selectedItems.length === 0 ? (
          <HelpText text="Select an item to checkout..." />
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
                  variation_price,
                } = item;
                let f_price = Number(
                  variation_price ? variation_price : price
                ).toLocaleString();
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
                {/* Show customer info form if user is not logged in*/}
                {!isAuthenticated ? (
                  <>
                    <section className="customer-info">
                      <h3 className="title">Customer Info</h3>
                      <div className="form-field">
                        <label
                          htmlFor="firstName"
                          className={
                            validity.firstName === null
                              ? "default"
                              : validity.firstName === true
                              ? "valid"
                              : "not-valid"
                          }
                        >
                          First name:
                        </label>
                        <input
                          className={
                            validity.firstName === null
                              ? "default"
                              : validity.firstName === true
                              ? "valid"
                              : "not-valid"
                          }
                          minLength={2}
                          maxLength={30}
                          required
                          type="text"
                          placeholder="John"
                          name="firstName"
                          value={customerInfo.firstName}
                          onChange={handleCustomerInfoChange}
                        />
                        <div className="error-message">
                          {errorMessage.firstName}
                        </div>
                      </div>
                      <div className="form-field">
                        <label
                          htmlFor="lastName"
                          className={
                            validity.lastName === null
                              ? "default"
                              : validity.lastName === true
                              ? "valid"
                              : "not-valid"
                          }
                        >
                          Last name:
                        </label>

                        <input
                          className={
                            validity.lastName === null
                              ? "default"
                              : validity.lastName === true
                              ? "valid"
                              : "not-valid"
                          }
                          minLength={2}
                          maxLength={30}
                          required
                          type="text"
                          placeholder="Doe"
                          name="lastName"
                          value={customerInfo.lastName}
                          onChange={handleCustomerInfoChange}
                        />
                        <div className="error-message">
                          {errorMessage.lastName}
                        </div>
                      </div>
                      <div className="form-field">
                        <label
                          htmlFor="mobileNumber"
                          className={
                            validity.mobileNumber === null
                              ? "default"
                              : validity.mobileNumber === true
                              ? "valid"
                              : "not-valid"
                          }
                        >
                          Mobile number:
                        </label>
                        <input
                          className={
                            validity.mobileNumber === null
                              ? "default"
                              : validity.mobileNumber === true
                              ? "valid"
                              : "not-valid"
                          }
                          required
                          minLength={11}
                          maxLength={15}
                          type="text"
                          placeholder="09xxxxxxxxx"
                          name="mobileNumber"
                          value={customerInfo.mobileNumber}
                          onChange={handleCustomerInfoChange}
                        />
                        <div className="error-message">
                          {errorMessage.mobileNumber}
                        </div>
                      </div>
                    </section>
                    <hr />
                  </>
                ) : null}

                <section className="shipping-info">
                  <h3 className="title">Shipping Info</h3>
                  <div className="form-field">
                    <label
                      htmlFor="address"
                      className={
                        validity.address === null
                          ? "default"
                          : validity.address === true
                          ? "valid"
                          : "not-valid"
                      }
                    >
                      Address:
                    </label>
                    <input
                      className={
                        validity.address === null
                          ? "default"
                          : validity.address === true
                          ? "valid"
                          : "not-valid"
                      }
                      minLength={8}
                      maxLength={100}
                      required
                      type="text"
                      placeholder="9100 St. Peter street..."
                      name="address"
                      value={shippingInfo.address}
                      onChange={handleShippingInfoChange}
                    />
                    <div className="error-message">{errorMessage.address}</div>
                  </div>
                  <div className="form-field">
                    <label
                      htmlFor="city"
                      className={
                        validity.city === null
                          ? "default"
                          : validity.city === true
                          ? "valid"
                          : "not-valid"
                      }
                    >
                      City:
                    </label>
                    <input
                      className={
                        validity.city === null
                          ? "default"
                          : validity.city === true
                          ? "valid"
                          : "not-valid"
                      }
                      minLength={4}
                      maxLength={50}
                      required
                      type="text"
                      placeholder="Antipolo"
                      name="city"
                      value={shippingInfo.city}
                      onChange={handleShippingInfoChange}
                    />
                    <div className="error-message">{errorMessage.city}</div>
                  </div>
                  <div className="form-field">
                    <label
                      htmlFor="province"
                      className={
                        validity.province === null
                          ? "default"
                          : validity.province === true
                          ? "valid"
                          : "not-valid"
                      }
                    >
                      Province:
                    </label>
                    <input
                      className={
                        validity.province === null
                          ? "default"
                          : validity.province === true
                          ? "valid"
                          : "not-valid"
                      }
                      minLength={4}
                      maxLength={50}
                      required
                      type="text"
                      placeholder="Rizal"
                      name="province"
                      value={shippingInfo.province}
                      onChange={handleShippingInfoChange}
                    />
                    <div className="error-message">{errorMessage.province}</div>
                  </div>
                  <div className="form-field">
                    <label
                      htmlFor="zipCode"
                      className={
                        validity.zipCode === null
                          ? "default"
                          : validity.zipCode === true
                          ? "valid"
                          : "not-valid"
                      }
                    >
                      Zip code:
                    </label>
                    <input
                      className={
                        validity.zipCode === null
                          ? "default"
                          : validity.zipCode === true
                          ? "valid"
                          : "not-valid"
                      }
                      minLength={3}
                      maxLength={4}
                      type="text"
                      placeholder="1870"
                      name="zipCode"
                      value={shippingInfo.zipCode}
                      onChange={handleShippingInfoChange}
                    />
                    <div className="error-message">{errorMessage.zipCode}</div>
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
                <h3>What to do after you order?</h3>-
                <h4 style={{ color: " var(--shadeDark)", fontWeight: "600" }}>
                  Wait for our call, so we can confirm your order. Thank you : )
                </h4>
                <br />
              </div>
            ) : null}
            {gcashInfo ? (
              <ModalWrapper>
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
              </ModalWrapper>
            ) : null}
            {confirmModal ? (
              <ModalWrapper>
                <div className="confirm-modal">
                  <h3>Do you want to complete your order?</h3>
                  <Button
                    type="button"
                    text="Ok"
                    functionality={() => processOrder(totalCartPrice)}
                  />
                  <div className="modal-close-button">
                    <img
                      src={closeIcon}
                      alt=""
                      onClick={() => closeConfirmModal()}
                    />
                  </div>
                </div>
              </ModalWrapper>
            ) : null}
            {alertModal ? (
              <ModalWrapper>
                <div className="alert-timer">
                  <h3>Transaction complete...</h3>
                  <h4 className="redirect-message">
                    Redirecting to store in {time}
                  </h4>
                </div>
              </ModalWrapper>
            ) : null}
          </>
        )}
      </section>
      <Navbottom />
    </>
  );
};

export default Checkout;
