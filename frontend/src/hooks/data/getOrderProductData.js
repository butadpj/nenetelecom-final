import { useFetch } from "../useFetch";

let orderProductUrl = "/api/order-product/";

export const getOrderProductData = () => {
  const { loading, data } = useFetch(orderProductUrl);

  let orderProductData = data;

  return { loading, orderProductData };
};
