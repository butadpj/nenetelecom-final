import { useContext, useEffect } from "react";

import { CartItemContext } from "../../../context/CartItemContext";

const OrdersLogic = () => {
  const [cartItemState] = useContext(CartItemContext);
  let orders = cartItemState.orders;

  useEffect(() => {
    document.body.style.overflow = "auto";
    document.body.style.overscrollBehaviorY = "auto";
  }, []);

  return { orders };
};

export default OrdersLogic;
