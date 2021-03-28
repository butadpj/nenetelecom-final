import { useContext } from "react";

import { CartItemContext } from "../../../context/CartItemContext";

const OrdersLogic = () => {
  const [cartItemState] = useContext(CartItemContext);

  let orders = cartItemState.orders;

  return { orders };
};

export default OrdersLogic;
