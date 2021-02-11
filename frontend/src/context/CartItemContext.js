import React, { useReducer, createContext } from "react";
import { reducer } from "../hooks/reducer";
import { getCustomerOrderProduct } from "../hooks/query/getCustomerOrderProduct";
import { getCookieCart } from "../hooks/data/getCookieCart";

export const CartItemContext = createContext();

const initalState = {
  cartProducts: [],
  showModal: false,
  totalCartItem: 0,
};

export const CartItemContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initalState);
  const { customerOrderProduct, total_items } = getCustomerOrderProduct();
  const { cookieCart } = getCookieCart();

  const get_total_items = (obj) => {
    let sum = 0;
    for (let el in obj) {
      if (obj.hasOwnProperty(el)) {
        sum += parseFloat(obj[el].quantity);
      }
    }
    return sum;
  };

  let cartItems = [];
  for (var key of Object.keys(cookieCart)) {
    let item = {};
    item["product"] = key;
    item["quantity"] = cookieCart[key].quantity;
    cartItems.push(item);
  }

  state.cartProducts = cartItems;
  state.totalCartItem = get_total_items(state.cartProducts);

  return (
    <CartItemContext.Provider value={[state, dispatch]}>
      {props.children}
    </CartItemContext.Provider>
  );
};
