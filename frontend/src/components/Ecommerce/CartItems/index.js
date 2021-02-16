import React, { useContext } from "react";

import "./CartItems.css";
import { CartItemContext } from "../../../context/CartItemContext";
import { getProducts } from "../../../hooks/query/getProducts";
import ProductLogic from "../../../components/Ecommerce/Product/ProductLogic";
import GetCurrentCustomer from "../../../hooks/GetCurrentCustomer";

const CartItems = () => {
  const [state] = useContext(CartItemContext);
  const { products } = getProducts();
  const { processCart } = ProductLogic();
  const { djangoCurrentUser } = GetCurrentCustomer();

  let cartItemData = state.cartProducts;
  let cartItems = [];

  cartItemData.forEach((item) => {
    products.forEach((product) => {
      if (product.id === item.product) {
        product.quantity = item.quantity;
        cartItems.push(product);
      }
    });
  });

  return (
    <div className="cart-items">
      <div className="helper">
        <span>Select a product to checkout</span>
        <i className="fas fa-check-circle"></i>
      </div>
      {cartItems.map((item) => {
        const { id, image, name, brand, price, quantity } = item;
        let selected = false;

        let f_price = Number(price).toLocaleString();
        return (
          <div className="item" key={id}>
            <div className="item-main">
              <img className="item-image" width="130" src={image[0]} alt="" />
              <div className="item-info">
                <div className="item-info-name">{name}</div>
                <div className="item-info-brand">
                  <p>Brand: {brand}</p>{" "}
                </div>
                <div className="item-info-price">
                  <div className="item-info-current-price">₱ {f_price}.00</div>
                  <div className="item-info-original-price">
                    <p>₱ 49,000.00</p>
                    <span className="discount">20% off</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="item-action">
              <div className="item-select">
                {selected ? (
                  <i className="fas fa-check-circle"></i>
                ) : (
                  <i className="far fa-circle"></i>
                )}
              </div>
              <div className="item-quantity">
                <div
                  onClick={() =>
                    processCart(id, price, "remove", djangoCurrentUser)
                  }
                >
                  <i className="fas fa-minus"></i>
                </div>
                <span>{quantity}</span>
                <div
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
    </div>
  );
};

export default CartItems;
