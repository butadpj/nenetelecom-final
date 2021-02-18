import { useFetch } from "../useFetch";

let productImageUrl = "/api/product-image/";

export const getProductImageData = () => {
  const { loading, data } = useFetch(productImageUrl);
  let productImageData = data;
  let productImageLoading = loading;
  return { productImageData, productImageLoading };
};
