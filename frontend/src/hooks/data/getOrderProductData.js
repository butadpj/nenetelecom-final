import { useFetch } from "../useFetch";

let oderProductUrl = "order-product";

export const getOrderProductData = () => {
  const { loading, data } = useFetch(oderProductUrl);
  let orderProductData = data;
  let orderProductLoading = loading;
  return { orderProductLoading, orderProductData };
};
