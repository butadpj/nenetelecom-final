import React, { useState, useEffect } from "react";

const GetCurrentCustomer = () => {
  const [djangoCurrentUser, setDjangoCurrentUser] = useState();
  const [
    djangoCurrentCustomerFirstName,
    setDjangoCurrentCustomerFirstName,
  ] = useState();
  const [
    djangoCurrentCustomerLastName,
    setDjangoCurrentCustomerLastName,
  ] = useState();

  const [
    djangoCurrentCustomerMobileNumber,
    setDjangoCurrentCustomerMobileNumber,
  ] = useState();
  const [djangoCurrentCustomerId, setDjangoCurrentCustomerId] = useState();

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      setDjangoCurrentUser(currentUser);
      setDjangoCurrentCustomerFirstName(currentCustomerFirstName);
      setDjangoCurrentCustomerLastName(currentCustomerLastName);
      setDjangoCurrentCustomerId(currentCustomerId);
      setDjangoCurrentCustomerMobileNumber(currentCustomerMobileNumber);
    }

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    djangoCurrentCustomerFirstName,
    djangoCurrentCustomerLastName,
    djangoCurrentCustomerMobileNumber,
    djangoCurrentCustomerId,
    djangoCurrentUser,
  };
};

export default GetCurrentCustomer;
