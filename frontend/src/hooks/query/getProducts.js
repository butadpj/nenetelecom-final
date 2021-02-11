import React from "react";
import { getProductsData } from "../data/getProductsData";
import { getProductImageData } from "../data/getProductImageData";

export const getProducts = () => {
  const { productsData } = getProductsData();
  const { productImageData } = getProductImageData();

  let products = productsData.map((product) => {
    let imageArray = [];

    productImageData.forEach((image) => {
      if (image.product == product.id) {
        imageArray.push(image.image);
      }
    });
    product.image = imageArray;
    return product;
  });
  return { products };
};
