import React, { useState, useEffect } from "react";

const GetCurrentCustomer = () => {
  const [djangoCurrentUser, setDjangoCurrentUser] = useState();
  const [djangoCurrentCustomer, setDjangoCurrentCustomer] = useState();
  const [djangoCurrentCustomerId, setDjangoCurrentCustomerId] = useState();

  useEffect(() => {
    setDjangoCurrentUser(currentUser);
    setDjangoCurrentCustomer(currentCustomer);
    setDjangoCurrentCustomerId(currentCustomerId);
  }, []);

  return { djangoCurrentCustomer, djangoCurrentCustomerId, djangoCurrentUser };
};

export default GetCurrentCustomer;
