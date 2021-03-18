import { useEffect, useContext } from "react";
import GetCurrentCustomer from "../../../hooks/GetCurrentCustomer";
import { CartItemContext } from "../../../context/CartItemContext";

const CartLogic = () => {
  const [state] = useContext(CartItemContext);
  const { djangoCurrentUser } = GetCurrentCustomer();
  let totalCartPrice = state.totalCartPrice;
  let f_totalCartPrice = Number(totalCartPrice).toLocaleString();

  useEffect(() => {
    document.body.style.overflow = "auto";
    document.title = `Nenetelecom | Store`;
  }, []);

  return { f_totalCartPrice, state, djangoCurrentUser };
};

export default CartLogic;
