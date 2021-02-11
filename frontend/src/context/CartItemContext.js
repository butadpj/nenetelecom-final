import React, { useReducer, createContext } from "react";
import { reducer } from "../hooks/reducer";
import { getCustomerOrderProduct } from "../hooks/query/getCustomerOrderProduct";

export const CartItemContext = createContext();

const initalState = {
  cartProducts: [],
  showModal: false,
  totalCartItem: 0,
};

export const CartItemContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initalState);
  const { customerOrderProduct, total_items } = getCustomerOrderProduct();

  state.cartProducts = customerOrderProduct;
  state.totalCartItem = total_items;

  return (
    <CartItemContext.Provider value={[state, dispatch]}>
      {props.children}
    </CartItemContext.Provider>
  );
};
