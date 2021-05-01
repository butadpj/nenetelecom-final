import { getProductsData } from "../data/getProductsData";

export const getProducts = () => {
  const { productsData, productLoading } = getProductsData();

  return {
    productsData,
    productLoading,
  };
};
