import { useState, useEffect } from "react";

const GetCurrentCustomer = () => {
  const [djangoCurrentCustomerId, setDjangoCurrentCustomerId] = useState();
  const [djangoIsSuperUser, setDjangoIsSuperUser] = useState();
  const [djangoIsAuthenticated, setDjangoIsAuthenticated] = useState();
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      setDjangoCurrentCustomerId(currentCustomerId);
      setDjangoIsSuperUser(isSuperUser);
      setDjangoIsAuthenticated(isAuthenticated);
    }

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    djangoCurrentCustomerId,
    djangoIsAuthenticated,
    djangoIsSuperUser,
  };
};

export default GetCurrentCustomer;
