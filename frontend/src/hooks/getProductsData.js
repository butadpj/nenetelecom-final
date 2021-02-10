import { useFetch } from "./useFetch";

let productsUrl = "/api/products/";

export const getProductsData = () => {
  const { loading, data } = useFetch(productsUrl);
  let productsData = data;
  return { loading, productsData };
};
