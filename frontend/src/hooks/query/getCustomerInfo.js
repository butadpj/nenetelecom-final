import GetCurrentCustomer from "../GetCurrentCustomer";
import { getCustomersData } from "../data/getCustomersData";

export const getCustomerInfo = () => {
  const {
    djangoCurrentCustomerId,
    djangoIsAuthenticated,
    djangoIsSuperUser,
  } = GetCurrentCustomer();
  const { customersData } = getCustomersData();

  let customerFirstName;
  let customerLastName;
  let customerFullName;
  let customerMobileNumber;
  let customerDisplayPicture;
  let isAuthenticated;
  let isSuperUser;

  let customer = customersData.filter(
    (data) => data.id === djangoCurrentCustomerId
  );

  customer.map((data) => {
    customerFirstName = data.au_first_name;
    customerLastName = data.au_last_name;
    customerMobileNumber = data.au_mobile_number;
    customerDisplayPicture = data.display_picture;
  });

  customerFullName = `${customerFirstName} ${customerLastName}`;

  if (djangoIsAuthenticated === "True") {
    isAuthenticated = true;
  }
  if (djangoIsSuperUser === "True") {
    isSuperUser = true;
  }

  return {
    customer,
    customerFirstName,
    customerLastName,
    customerFullName,
    customerMobileNumber,
    customerDisplayPicture,
    isAuthenticated,
    isSuperUser,
  };
};
