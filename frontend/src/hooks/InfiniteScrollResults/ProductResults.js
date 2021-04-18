import { useState } from "react";
import { getProductImageData } from "../data/getProductImageData";
import { getProductVariationData } from "../data/getProductVariationData";

const ProductResults = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [offSet, setOffSet] = useState(0);
  const [limit, setLimit] = useState(5);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { productImageData } = getProductImageData();

  const { productVariationData } = getProductVariationData();

  let productResults = data
    ? data.map((product) => {
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
      })
    : [];

  const shuffle = (array) => {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  return {
    productResults,
    loading,
    hasMore,
    offSet,
    limit,
    setHasMore,
    setOffSet,
    setLimit,
    setLoading,
    setData,
    data,
    shuffle,
    isRefreshing,
    setIsRefreshing,
  };
};

export default ProductResults;
