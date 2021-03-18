import React, { useReducer, createContext } from "react";
import { reducer } from "../hooks/cartItemReducer";
import { getCustomerOrderProduct } from "../hooks/query/getCustomerOrderProduct";
import { getCookieCart } from "../hooks/data/getCookieCart";
import GetCurrentCustomer from "../hooks/GetCurrentCustomer";

export const CartItemContext = createContext();

const initialState = {
  cartProducts: [],
  completedOrders: [],
  totalCartItem: 0,
  totalCartPrice: 0,
  cartNotif: 0,
};

const CartItemContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { djangoCurrentUser } = GetCurrentCustomer();
  const {
    completedCustomerOrderDisplay,
    customerOrderProduct,
  } = getCustomerOrderProduct();
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
  if (djangoCurrentUser === "AnonymousUser") {
    //If guest user
    state.cartProducts = cookieCart;
    state.totalCartItem = get_total_items(state.cartProducts);
    state.totalCartPrice = get_total_price(
      state.cartProducts.filter((item) => item.selected === true)
    );
    state.cartNotif = state.totalCartItem;
  } else {
    //If logged in
    initialState.cartProducts = customerOrderProduct;
    initialState.completedOrders = completedCustomerOrderDisplay;
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
