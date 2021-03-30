import { useEffect, useContext } from "react";
import { CartItemContext } from "../../../context/CartItemContext";

const CartLogic = () => {
  const [state] = useContext(CartItemContext);
  let totalCartPrice = state.totalCartPrice;
  let f_totalCartPrice = Number(totalCartPrice).toLocaleString();

  useEffect(() => {
    document.body.style.overflow = "auto";
    document.title = `Nenetelecom | Store`;
  }, []);

  return { f_totalCartPrice };
};

export default CartLogic;
