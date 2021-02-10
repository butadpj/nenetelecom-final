import React, { useContext } from "react";

import GetCurrentCustomer from "../../../hooks/GetCurrentCustomer";
import { getOrdersData } from "../../../hooks/getOrdersData";
import { getOrderProductData } from "../../../hooks/getOrderProductData";
import { getProductsData } from "../../../hooks/getProductsData";

import { CartItemContext } from "../../../context/CartItemContext";

const CartItems = () => {
  const { djangoCurrentCustomerId } = GetCurrentCustomer();
  const { ordersData } = getOrdersData();
  const { orderProductData } = getOrderProductData();
  const { productsData } = getProductsData();

  const [state] = useContext(CartItemContext);

  let customerOrders = [];

  ordersData.forEach((data) => {
    if (data.customer === djangoCurrentCustomerId) {
      customerOrders.push(data.transaction_id);
    }
  });

  let customerOrderProduct = [];

  orderProductData.forEach((data) => {
    customerOrders.forEach((order) => {
      if (data.order === order) {
        customerOrderProduct.push(data);
      }
    });
  });

  let customerProductsData = state.cartProducts;

  return (
    <div className="cart-items">
      <div className="helper">
        <span>Select a product to checkout</span>
        <i className="fas fa-check-circle"></i>
      </div>
      {customerProductsData.map((cartProduct) => {
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
