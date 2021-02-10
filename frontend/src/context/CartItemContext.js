import React, { useReducer, createContext } from "react";

import { reducer } from "../hooks/reducer";

export const CartItemContext = createContext();

const initalState = {
  cartProducts: [],
  showModal: false,
  totalCartItem: 0,
};

export const CartItemContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initalState);
  return (
    <CartItemContext.Provider value={[state, dispatch]}>
      {props.children}
    </CartItemContext.Provider>
  );
};
