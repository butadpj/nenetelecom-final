import { useEffect, useContext } from "react";
import { getCustomerOrderProduct } from "./query/getCustomerOrderProduct";
import { CartItemContext } from "../context/CartItemContext";

export const updateCart = () => {
  const { customerOrderProduct } = getCustomerOrderProduct();
  const [state] = useContext(CartItemContext);

  const update = () => {
    let cartItems = [];
    customerOrderProduct.forEach((op) => {
      let item = {};
      item["product"] = op.product;
      item["quantity"] = op.quantity;
      cartItems.push(item);
    });
    state.cartProducts = cartItems;
  };
  return { update };
};
