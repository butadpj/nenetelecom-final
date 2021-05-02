import React, { useState, useContext, useEffect } from "react";

import GetCurrentCustomer from "../../../../hooks/GetCurrentCustomer";
import { CustomerInfoContext } from "../../../../context/CustomerInfoContext";
import contenteditableMaxLength from "contenteditable-max-length";
import { useHandleShowAlert } from "../../../../hooks/useHandleShowAlert";

const CustomerInfoLogic = () => {
  const { djangoCurrentCustomerId } = GetCurrentCustomer();
  const { alertInfo, showAlert, handleShowAlert } = useHandleShowAlert();
  const [state, dispatch] = useContext(CustomerInfoContext);
  const [isLoading, setIsLoading] = useState(false);

  let customerFirstName = state.customerInfo.firstName;
  let customerLastName = state.customerInfo.lastName;
  let customerMobileNumber = state.customerInfo.mobileNumber;
  let customerCompleteAddress = state.customerInfo.completeAddress;

  const [isEditing, setIsEditing] = useState(false);

  const showSaveButton = () => {
    setIsEditing(true);
  };

  const hideSaveButton = () => {
    setIsEditing(false);
  };

  let infoValues = document.querySelectorAll(".info .value");
  infoValues.forEach((value) => {
    let input = value.getAttribute("name");
    if (isEditing) {
      value.setAttribute("contentEditable", "true");
      value.style.border = "1px solid black";
      value.style.padding = "0.1em 0.5em 0.1em 0.1em";
      if (input == "firstName")
        contenteditableMaxLength({ element: value, maxLength: 25 });

      if (input == "lastName")
        contenteditableMaxLength({ element: value, maxLength: 15 });

      if (input == "mobileNumber")
        contenteditableMaxLength({ element: value, maxLength: 11 });
    } else {
      value.setAttribute("contentEditable", "false");
      if (input == "firstName") value.textContent = customerFirstName;
      if (input == "lastName") value.textContent = customerLastName;
      if (input == "mobileNumber") value.textContent = customerMobileNumber;
      value.style.border = "none";
    }
  });

  const saveNewCustomerInfo = () => {
    infoValues.forEach((value) => {
      let input = value.getAttribute("name");
      if (input == "firstName") {
        customerFirstName = value.textContent;
      }
      if (input == "lastName") {
        customerLastName = value.textContent;
      }
      if (input == "mobileNumber") {
        customerMobileNumber = value.textContent;
      }
    });

    setIsLoading(true);
    fetch(`/api/v2/customers/${djangoCurrentCustomerId}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify({
        first_name: customerFirstName,
        last_name: customerLastName,
        mobile_number: customerMobileNumber,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        dispatch({
          type: "EDIT_CUSTOMER_INFO",
          payload: {
            firstName: data.first_name,
            lastName: data.last_name,
            fullName: `${data.first_name} ${data.last_name}`,
            mobileNumber: data.mobile_number,
          },
        });
        handleShowAlert(
          "center",
          "success",
          "Customer info successfuly changed"
        );
        hideSaveButton();
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        handleShowAlert(
          "center",
          "danger",
          "An error occured. Try to refresh the page"
        );
      });
  };

  return {
    customerFirstName,
    customerLastName,
    customerMobileNumber,
    customerCompleteAddress,
    isEditing,
    showSaveButton,
    hideSaveButton,
    saveNewCustomerInfo,
    showAlert,
    alertInfo,
    isLoading,
  };
};

export default CustomerInfoLogic;
