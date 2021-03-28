import { useFetch } from "../useFetch";

let oderProductUrl = "/api/order-product/";

export const getOrderProductData = () => {
  const { loading, data } = useFetch(oderProductUrl);

  let orderProductData = data;
  return { loading, orderProductData };
};
