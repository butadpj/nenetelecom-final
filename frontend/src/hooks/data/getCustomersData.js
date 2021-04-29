import { useFetch } from "../useFetch";

let customersUrl = "customers";

export const getCustomersData = () => {
  const { loading, data } = useFetch(customersUrl);

  let customersData = data;
  return { loading, customersData };
};
