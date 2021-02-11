import React, { useContext } from "react";

import { CartItemContext } from "../../../context/CartItemContext";
import { getProducts } from "../../../hooks/query/getProducts";

const CartItems = () => {
  const [state] = useContext(CartItemContext);
  const { products } = getProducts();

  let cartItemData = state.cartProducts;

  cartItemData.forEach((item) => {
    products.forEach((product) => {
      if (item.product === product.id) {
        product.quantity = item.quantity;
      }
    });
  });

  return (
    <div className="cart-items">
      <div className="helper">
        <span>Select a product to checkout</span>
        <i className="fas fa-check-circle"></i>
      </div>
      {products.map((cartProduct) => {
        const { id, name, brand, price, quantity } = cartProduct;

        return (
          <div className="item" key={id}>
            <div className="item-main">
              <div className="item-image"></div>
              <div className="item-info">
                <div className="item-info-name">{name}</div>
                <div className="item-info-brand">{brand}</div>
                <div className="item-info-price">
                  <div className="item-info-current-price">{price}</div>
                  <div className="item-info-original-price"></div>
                  <div className="item-info-discount"></div>
                </div>
              </div>
              <div className="item-action">
                <div className="item-select"></div>
                <div className="item-quantity">{quantity}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CartItems;
