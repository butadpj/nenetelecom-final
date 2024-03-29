import React from "react";

import "./CartItems.css";
import CartItemsLogic from "./CartItemsLogic";
import checkIcon from "../../../assets/svgs/check.svg";
import uncheckIcon from "../../../assets/svgs/uncheck.svg";
import Loader from "../../../components/Ecommerce/Loader";
import HelpText from "../../../components/Ecommerce/HelpText";

const CartItems = () => {
  const {
    selectedItemToggle,
    cartDisplayProducts,
    processCart,
    isAuthenticated,
    isLoading,
    noSelected,
  } = CartItemsLogic();

  return (
    <div className="cart-items">
      {isLoading ? (
        <Loader />
      ) : cartDisplayProducts.length === 0 ? (
        <HelpText text="Add something in your cart..." />
      ) : (
        <>
          {noSelected() && (
            <div>
              <HelpText
                text="Select a product to checkout"
                icon={<i className="fas fa-check-circle"></i>}
              />
            </div>
          )}

          {cartDisplayProducts.map((item) => {
            const {
              id,
              images,
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
                    width="130"
                    src={images[0]}
                    alt=""
                  />
                  <div className="item-info">
                    <div className="item-info-name">{name}</div>
                    <div className="item-info-brand">
                      <p>Brand: {brand}</p>
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
                        processCart(
                          id,
                          price,
                          "remove",
                          isAuthenticated,
                          variation_price ? variation_price : null
                        )
                      }
                    >
                      <i className="fas fa-minus"></i>
                    </div>
                    <span>{quantity}</span>
                    <div
                      className="quantity-add ripple"
                      onClick={() =>
                        processCart(
                          id,
                          price,
                          "add",
                          isAuthenticated,
                          variation_price ? variation_price : null
                        )
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
