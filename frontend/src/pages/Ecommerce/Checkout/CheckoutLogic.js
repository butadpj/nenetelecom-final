import { useState, useContext, useEffect } from "react";
import CartItemsLogic from "../../../components/Ecommerce/CartItems/CartItemsLogic";
import { CartItemContext } from "../../../context/CartItemContext";
import { ProductContext } from "../../../context/ProductContext";
import GetCurrentCustomer from "../../../hooks/GetCurrentCustomer";
import { getCustomersData } from "../../../hooks/data/getCustomersData";

const CheckoutLogic = () => {
  const {
    djangoCurrentUser,
    djangoCurrentCustomerFirstName,
    djangoCurrentCustomerLastName,
    djangoCurrentCustomerMobileNumber,
  } = GetCurrentCustomer();

  const { customersData } = getCustomersData();
  const { selectedItems } = CartItemsLogic();

  const [cartItemState] = useContext(CartItemContext);
  const [productState] = useContext(CartItemContext);

  const [isFormComplete, setIsFormComplete] = useState(false);
  const [gcashInfo, setGcashInfo] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [alertModal, setAlertModal] = useState(false);
  const [time, setTime] = useState(4);

  let isLoading = productState.isLoading;
  let totalCartPrice = cartItemState.totalCartPrice;

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

  const [validity, setValidity] = useState({
    firstName: null,
    lastName: null,
    mobileNumber: null,
    address: null,
    city: null,
    province: null,
    zipCode: null,
  });

  const [errorMessage, setErrorMessage] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    address: "",
    city: "",
    province: "",
    zipCode: "",
  });

  let usersMobileNumber = [];
  customersData.forEach((data) => {
    usersMobileNumber.push(data.au_mobile_number);
  });

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

  const closeConfirmModal = () => {
    document.body.style.overflow = "auto";
    setConfirmModal(false);
  };

  const showAlertModal = () => {
    document.body.style.overflow = "hidden";
    setAlertModal(true);
  };

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
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
    }

    return () => {
      isMounted = false;
    };
  }, [alertModal, time]);

  const checkValidity = (input, value) => {
    if (input === "firstName") {
      let regex = /^[a-zA-Z\s]{2,30}$/;

      if (!value.match(regex)) {
        setValidity({ ...validity, firstName: false });
        setErrorMessage({
          ...errorMessage,
          firstName: "Please enter a valid name",
        });
      } else {
        setValidity({ ...validity, firstName: true });
        setErrorMessage({
          ...errorMessage,
          firstName: "",
        });
      }
    }

    if (input === "lastName") {
      let regex = /^[a-zA-Z\s]{2,30}$/;

      if (!value.match(regex)) {
        setValidity({ ...validity, lastName: false });
        setErrorMessage({
          ...errorMessage,
          lastName: "Please enter a valid name",
        });
      } else {
        setValidity({ ...validity, lastName: true });
        setErrorMessage({
          ...errorMessage,
          lastName: "",
        });
      }
    }

    if (input === "mobileNumber") {
      let initialDigit = "09";
      let inputInitialDigit = value.slice(0, 2);
      let regex = /^[0-9]{11}$/;

      if (inputInitialDigit != initialDigit || !value.match(regex)) {
        setValidity({ ...validity, mobileNumber: false });
        setErrorMessage({
          ...errorMessage,
          mobileNumber: "Please enter a valid mobile number",
        });
      } else if (usersMobileNumber.includes(value)) {
        setValidity({ ...validity, mobileNumber: false });
        setErrorMessage({
          ...errorMessage,
          mobileNumber: "This mobile number already exists",
        });
      } else {
        setValidity({ ...validity, mobileNumber: true });
        setErrorMessage({
          ...errorMessage,
          mobileNumber: "",
        });
      }
    }

    if (input === "address") {
      let regex = /^[a-zA-Z\s,@.#\d]{8,100}$/;

      if (!value.match(regex)) {
        setValidity({ ...validity, address: false });
        setErrorMessage({
          ...errorMessage,
          address: "Please enter a valid address",
        });
      } else {
        setValidity({ ...validity, address: true });
        setErrorMessage({
          ...errorMessage,
          address: "",
        });
      }
    }

    if (input === "city") {
      let regex = /^[a-zA-Z\s]{4,50}$/;

      if (!value.match(regex)) {
        setValidity({ ...validity, city: false });
        setErrorMessage({
          ...errorMessage,
          city: "Please enter a valid city name",
        });
      } else {
        setValidity({ ...validity, city: true });
        setErrorMessage({
          ...errorMessage,
          city: "",
        });
      }
    }

    if (input === "province") {
      let regex = /^[a-zA-Z\s]{4,50}$/;

      if (!value.match(regex)) {
        setValidity({ ...validity, province: false });
        setErrorMessage({
          ...errorMessage,
          province: "Please enter a valid province name",
        });
      } else {
        setValidity({ ...validity, province: true });
        setErrorMessage({
          ...errorMessage,
          province: "",
        });
      }
    }

    if (input === "zipCode") {
      let regex = /^[\d]{3,4}$/;

      if (!value.match(regex)) {
        setValidity({ ...validity, zipCode: false });
        setErrorMessage({
          ...errorMessage,
          zipCode: "Please enter a valid zip code",
        });
      } else {
        setValidity({ ...validity, zipCode: true });
        setErrorMessage({
          ...errorMessage,
          zipCode: "",
        });
      }
    }
  };

  const allInputIsValid = () => {
    let inputStatus = [];
    Object.values(validity).forEach((value) => {
      if (value != null) {
        inputStatus.push(value);
      }
    });

    let allValid = inputStatus.every((value) => {
      return value;
    });

    return allValid;
  };

  const handleCustomerInfoChange = (e) => {
    let input = e.target.name;
    let value = e.target.value;

    checkValidity(input, value);

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

    checkValidity(input, value);
    setShippingInfo({ ...shippingInfo, [input]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (allInputIsValid()) {
      setIsFormComplete(true);
    }
    return false;
  };

  const processOrder = (total) => {
    fetch("/store/checkout/process_order/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify({
        customerInfo: customerInfo,
        shippingInfo: shippingInfo,
        total: total,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        cart = {};
        document.cookie = "cart=" + JSON.stringify(cart) + ";domain=;path=/";
        showAlertModal();
      })
      .catch((err) => console.log(err));
  };

  return {
    cartItemState,
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
    validity,
    errorMessage,
    isLoading,
    totalCartPrice,
  };
};

export default CheckoutLogic;
