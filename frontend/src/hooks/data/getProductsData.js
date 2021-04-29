import { useFetch } from "../useFetch";

let productsUrl = "products";

export const getProductsData = () => {
  const { loading, data } = useFetch(productsUrl);
  let productsData = data;
  let productLoading = loading;
  return { productsData, productLoading };
};
