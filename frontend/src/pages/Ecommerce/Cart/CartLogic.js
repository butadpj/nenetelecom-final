import React, { useEffect, useContext } from "react";
import { CartItemContext } from "../../../context/CartItemContext";

const CartLogic = () => {
  const [state] = useContext(CartItemContext);
  let totalCartPrice = state.totalCartPrice;
  let f_totalCartPrice = Number(totalCartPrice).toLocaleString();

  useEffect(() => {
    document.body.style.overflow = "auto";
  }, []);

  return { f_totalCartPrice, state };
};

export default CartLogic;
