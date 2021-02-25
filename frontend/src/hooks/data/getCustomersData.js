import { useFetch } from "../useFetch";

let customersUrl = "/api/customers/";

export const getCustomersData = () => {
  const { loading, data } = useFetch(customersUrl);

  let customersData = data;
  return { loading, customersData };
};
