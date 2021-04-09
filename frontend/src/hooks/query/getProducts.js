import { getProductsData } from "../data/getProductsData";
import { getProductImageData } from "../data/getProductImageData";
import { getProductVariationData } from "../data/getProductVariationData";

export const getProducts = () => {
  const { productsData, productLoading } = getProductsData();
  const { productImageData, productImageLoading } = getProductImageData();
  const {
    productVariationData,
    productVariationLoading,
  } = getProductVariationData();

  let products = productsData.map((product) => {
    let imageArray = [];
    let variationArray = [];
    productImageData.forEach((image) => {
      if (image.product == product.id) {
        imageArray.push(image.image);
      }
    });
    productVariationData.forEach((variation) => {
      if (variation.product == product.id) {
        variationArray.push(variation);
      }
    });

    product.image = imageArray;
    product.variation = variationArray;
    return product;
  });
  console.log(products);
  return { products, productLoading, productImageLoading };
};
