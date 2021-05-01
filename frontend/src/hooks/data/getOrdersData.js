import { useFetch } from "../useFetch";

let ordersUrl = "orders";

export const getOrdersData = () => {
  const { loading, data } = useFetch(ordersUrl);
  let ordersData = data;
  let ordersLoading = loading;
  return { ordersLoading, ordersData };
};
