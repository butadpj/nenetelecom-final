import { useState, useContext } from "react";
import CartItemsLogic from "../../../components/Ecommerce/CartItems/CartItemsLogic";
import { CartItemContext } from "../../../context/CartItemContext";
import GetCurrentCustomer from "../../../hooks/GetCurrentCustomer";

const CheckoutLogic = () => {
  const [customerInfo, setCustomerInfo] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
  });
  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    city: "",
    province: "",
    zipCode: "",
  });
  const { selectedItems } = CartItemsLogic();
  const [state] = useContext(CartItemContext);

  const { djangoCurrentUser } = GetCurrentCustomer();

  const handleChange = (e) => {
    let input = e.target.name;
    let value = e.target.value;

    setCustomerInfo({ ...customerInfo, [input]: value });
    setShippingInfo({ ...shippingInfo, [input]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(customerInfo);
    console.log(shippingInfo);
  };

  return {
    state,
    customerInfo,
    setCustomerInfo,
    shippingInfo,
    setShippingInfo,
    selectedItems,
    handleChange,
    handleSubmit,
    djangoCurrentUser,
  };
};

export default CheckoutLogic;
