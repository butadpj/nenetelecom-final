import React, { useReducer, createContext } from "react";
import { reducer } from "../hooks/reducer/cartItemReducer";
import { getCustomerBag } from "../hooks/query/getCustomerBag";
import { getCustomerOrder } from "../hooks/query/getCustomerOrder";
import { getCookieCart } from "../hooks/data/getCookieCart";
import { getCustomerInfo } from "../hooks/query/getCustomerInfo";

export const CartItemContext = createContext();

const initialState = {
  cartProducts: [],
  orders: [],
  totalCartItem: 0,
  totalCartPrice: 0,
  cartNotif: 0,
};

const CartItemContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isAuthenticated } = getCustomerInfo();
  const { customerBagItem } = getCustomerBag();
  const { cookieCart } = getCookieCart();
  const { customerOrderDisplay } = getCustomerOrder();

  const get_total_items = (obj) => {
    let sum = 0;
    for (let el in obj) {
      if (obj.hasOwnProperty(el)) {
        sum += parseFloat(obj[el].quantity);
      }
    }
    return sum;
  };

  const get_total_price = (obj) => {
    let sum = 0;
    for (let el in obj) {
      if (obj.hasOwnProperty(el)) {
        sum += parseFloat(obj[el].total_price);
      }
    }
    return sum;
  };

  //Set the initial source of truth
  if (!isAuthenticated) {
    //If guest user
    state.cartProducts = cookieCart;
    state.totalCartItem = get_total_items(state.cartProducts);
    state.totalCartPrice = get_total_price(
      state.cartProducts.filter((item) => item.selected === true)
    );
    state.cartNotif = state.totalCartItem;
  } else {
    //If logged in
    initialState.cartProducts = customerBagItem;
    initialState.orders = customerOrderDisplay;
    state.totalCartItem = get_total_items(state.cartProducts);
    state.totalCartPrice = get_total_price(
      state.cartProducts.filter((item) => item.selected === true)
    );
    state.cartNotif = state.totalCartItem;
  }

  return (
    <CartItemContext.Provider value={[state, dispatch]}>
      {props.children}
    </CartItemContext.Provider>
  );
};

export default CartItemContextProvider;
