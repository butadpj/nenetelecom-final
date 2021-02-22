import { useState, useContext, useEffect } from "react";
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
  const [confirmModal, setConfirmModal] = useState(false);
  const [alertModal, setAlertModal] = useState(false);
  const [time, setTime] = useState(4);
  const { selectedItems } = CartItemsLogic();

  const [state] = useContext(CartItemContext);

  const {
    djangoCurrentUser,
    djangoCurrentCustomerFirstName,
    djangoCurrentCustomerLastName,
    djangoCurrentCustomerMobileNumber,
  } = GetCurrentCustomer();

  const showGcashInfo = () => {
    document.body.style.overflow = "hidden";
    setGcashInfo(true);
  };

  const closeGcashInfo = () => {
    document.body.style.overflow = "auto";
    setGcashInfo(false);
  };

  const showConfirmModal = () => {
    document.body.style.overflow = "hidden";
    setConfirmModal(true);
  };

  const showAlertModal = () => {
    document.body.style.overflow = "hidden";
    setAlertModal(true);
  };

  useEffect(() => {
    if (alertModal) {
      let myTimer;
      if (time === 0) {
        clearInterval(myTimer);
        window.location.replace("/store/home");
      } else {
        const timer = () => {
          setTime(time - 1);
        };

        myTimer = setInterval(timer, 1000);
      }
    }
  }, [alertModal, time]);

  const closeConfirmModal = () => {
    document.body.style.overflow = "auto";
    setConfirmModal(false);
  };

  const handleCustomerInfoChange = (e) => {
    let input = e.target.name;
    let value = e.target.value;
    if (djangoCurrentUser === "AnonymousUser") {
      setCustomerInfo({ ...customerInfo, [input]: value });
    }
  };

  const handleShippingInfoChange = (e) => {
    let input = e.target.name;
    let value = e.target.value;
    if (djangoCurrentUser !== "AnonymousUser") {
      let userInfo = {
        firstName: djangoCurrentCustomerFirstName,
        lastName: djangoCurrentCustomerLastName,
        mobileNumber: djangoCurrentCustomerMobileNumber,
      };
      setCustomerInfo(userInfo);
    }
    setShippingInfo({ ...shippingInfo, [input]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsFormComplete(true);
  };

  const processOrder = (total) => {
    fetch("/store/checkout/process_order/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify({
        customerInfo: { ...customerInfo },
        shippingInfo: shippingInfo,
        total: total,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        showAlertModal();
      })
      .catch((err) => console.log(err));
  };

  return {
    state,
    selectedItems,
    customerInfo,
    shippingInfo,
    handleCustomerInfoChange,
    handleShippingInfoChange,
    handleSubmit,
    djangoCurrentUser,
    isFormComplete,
    gcashInfo,
    showGcashInfo,
    closeGcashInfo,
    confirmModal,
    showConfirmModal,
    closeConfirmModal,
    processOrder,
    alertModal,
    time,
  };
};

export default CheckoutLogic;
