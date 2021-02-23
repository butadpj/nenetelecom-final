import { useContext } from "react";

import { CartItemContext } from "../../../context/CartItemContext";

const OrdersLogic = () => {
  const [state] = useContext(CartItemContext);

  return { state };
};

export default OrdersLogic;
