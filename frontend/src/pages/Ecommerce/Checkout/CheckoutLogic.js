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
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [gcashInfo, setGcashInfo] = useState(false);

  const { selectedItems } = CartItemsLogic();
  const [state] = useContext(CartItemContext);

  const { djangoCurrentUser } = GetCurrentCustomer();

  const showGcashInfo = () => {
    document.body.style.overflow = "hidden";
    setGcashInfo(true);
  };

  const closeGcashInfo = () => {
    document.body.style.overflow = "auto";
    setGcashInfo(false);
  };

  const handleChange = (e) => {
    let input = e.target.name;
    let value = e.target.value;
    const guestInfo = {
      firstName: "Paul",
      lastName: "George",
      mobileNumber: "13213122",
    };
    setCustomerInfo(guestInfo);

    setShippingInfo({ ...shippingInfo, [input]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(customerInfo);
    console.log(shippingInfo);
    setIsFormComplete(true);
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
    isFormComplete,
    gcashInfo,
    showGcashInfo,
    closeGcashInfo,
  };
};

export default CheckoutLogic;
