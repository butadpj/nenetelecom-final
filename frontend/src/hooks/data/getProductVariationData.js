import { useFetch } from "../useFetch";

let productVariationUrl = "product-variation";

export const getProductVariationData = () => {
  const { loading, data } = useFetch(productVariationUrl);
  let productVariationData = data;
  let productVariationLoading = loading;
  return { productVariationData, productVariationLoading };
};
