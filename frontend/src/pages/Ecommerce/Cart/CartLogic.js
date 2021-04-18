import { useEffect, useContext } from "react";
import { CartItemContext } from "../../../context/CartItemContext";

const CartLogic = () => {
  const [state] = useContext(CartItemContext);
  let totalCartPrice = Number(state.totalCartPrice).toLocaleString();

  useEffect(() => {
    document.body.style.overflow = "auto";
    document.body.style.overscrollBehaviorY = "auto";

    document.title = `Nenetelecom | Store`;
  }, []);

  return { totalCartPrice };
};

export default CartLogic;
