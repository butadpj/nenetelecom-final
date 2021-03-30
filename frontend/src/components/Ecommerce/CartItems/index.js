import React from "react";

import "./CartItems.css";
import CartItemsLogic from "./CartItemsLogic";
import checkIcon from "../../../assets/svgs/check.svg";
import uncheckIcon from "../../../assets/svgs/uncheck.svg";
import Loader from "../../../components/Ecommerce/Loader";

const CartItems = () => {
  const {
    selectedItemToggle,
    cartDisplayProducts,
    processCart,
    djangoCurrentUser,
    isLoading,
    noSelected,
  } = CartItemsLogic();

  return (
    <div className="cart-items">
      {isLoading ? (
        <Loader />
      ) : cartDisplayProducts.length === 0 ? (
        <div className="helper">
          <span>Add something in your cart...</span>
        </div>
      ) : (
        <>
          {noSelected() && (
            <div className="helper">
              <span>Select a product to checkout</span>
              <i className="fas fa-check-circle"></i>
            </div>
          )}

          {cartDisplayProducts.map((item) => {
            const { id, image, name, brand, price, quantity, selected } = item;

            let f_price = Number(price).toLocaleString();
            return (
              <div className="item" key={id}>
                <div className="item-main">
                  <img
                    className="item-image"
                    width="130"
                    src={image[0]}
                    alt=""
                  />
                  <div className="item-info">
                    <div className="item-info-name">{name}</div>
                    <div className="item-info-brand">
                      <p>Brand: {brand}</p>{" "}
                    </div>
                    <div className="item-info-price">
                      <div className="item-info-current-price">
                        ₱ {f_price}.00
                      </div>
                      <div className="item-info-original-price">
                        <p>₱ 49,000.00</p>
                        <span className="discount">20% off</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="item-action">
                  <div
                    className="item-select"
                    onClick={() => selectedItemToggle(id)}
                  >
                    {selected ? (
                      <img src={checkIcon}></img>
                    ) : (
                      <img src={uncheckIcon}></img>
                    )}
                  </div>
                  <div className="item-quantity">
                    <div
                      className="quantity-remove ripple"
                      onClick={() =>
                        processCart(id, price, "remove", djangoCurrentUser)
                      }
                    >
                      <i className="fas fa-minus"></i>
                    </div>
                    <span>{quantity}</span>
                    <div
                      className="quantity-add ripple"
                      onClick={() =>
                        processCart(id, price, "add", djangoCurrentUser)
                      }
                    >
                      <i className="fas fa-plus"></i>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default CartItems;
