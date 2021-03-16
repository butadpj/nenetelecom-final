import { useContext } from "react";

import { CartItemContext } from "../../../context/CartItemContext";

const OrdersLogic = () => {
  const [cartItemState] = useContext(CartItemContext);

  let orders = cartItemState.completedOrders;

  return { orders };
};

export default OrdersLogic;
