import React, { useReducer, createContext } from "react";
import { reducer } from "../hooks/reducer/customerInfoReducer";
import { getCustomerInfo } from "../hooks/query/getCustomerInfo";

export const CustomerInfoContext = createContext();

const initialState = {
  customerInfo: {
    firstName: "",
    lastName: "",
    fullName: "",
    mobileNumber: "",
    completeAddress: "",
    displayPicture: "",
  },
};

const CustomerInfoContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    customerFirstName,
    customerLastName,
    customerFullName,
    customerMobileNumber,
    customerCompleteAddress,
    customerDisplayPicture,
  } = getCustomerInfo();

  initialState.customerInfo.firstName = customerFirstName;
  initialState.customerInfo.lastName = customerLastName;
  initialState.customerInfo.fullName = customerFullName;
  initialState.customerInfo.mobileNumber = customerMobileNumber;
  initialState.customerInfo.completeAddress = customerCompleteAddress;
  initialState.customerInfo.displayPicture = customerDisplayPicture;

  return (
    <CustomerInfoContext.Provider value={[state, dispatch]}>
      {props.children}
    </CustomerInfoContext.Provider>
  );
};

export default CustomerInfoContextProvider;
