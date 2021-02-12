import React, { useReducer, createContext } from "react";
import { reducer } from "../hooks/reducer";
import { getCustomerOrderProduct } from "../hooks/query/getCustomerOrderProduct";
import { getCookieCart } from "../hooks/data/getCookieCart";
import GetCurrentCustomer from "../hooks/GetCurrentCustomer";

export const CartItemContext = createContext();

const initalState = {
  cartProducts: [],
  totalCartItem: 0,
};

const CartItemContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initalState);
  const { djangoCurrentUser } = GetCurrentCustomer();
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
  //Set the initial source of truth
  if (djangoCurrentUser === "AnonymousUser") {
    //If guest user
    state.cartProducts = cookieCart;
    state.totalCartItem = get_total_items(state.cartProducts);
  } else {
    //If logged in

    state.totalCartItem = get_total_items(state.cartProducts);
  }

  return (
    <CartItemContext.Provider value={[state, dispatch]}>
      {props.children}
    </CartItemContext.Provider>
  );
};

export default CartItemContextProvider;
