import { useState, useEffect } from "react";

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
  const [
    djangoCurrentCustomerFullName,
    setDjangoCurrentCustomerFullName,
  ] = useState("");

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      setDjangoCurrentUser(currentUser);
      setDjangoCurrentCustomerFirstName(currentCustomerFirstName);
      setDjangoCurrentCustomerLastName(currentCustomerLastName);
      setDjangoCurrentCustomerId(currentCustomerId);
      setDjangoCurrentCustomerMobileNumber(currentCustomerMobileNumber);
      setDjangoCurrentCustomerFullName(
        `${currentCustomerFirstName} ${currentCustomerLastName}`
      );
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
    djangoCurrentCustomerFullName,
  };
};

export default GetCurrentCustomer;
