import React, { useState } from "react";

const ProductLogic = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [detailData, setDetailData] = useState();

  const handleShowProductDetails = (
    id,
    name,
    price,
    brand,
    image,
    description,
    variation
  ) => {
    setShowDetails(true);
    document.body.style.overflow = "hidden";

    createDetails({
      id: id,
      name: name,
      price: price,
      brand: brand,
      image: image,
      description: description,
      variation: variation,
    });
  };

  const handleCloseProductDetails = () => {
    let productView = document.querySelector(".product-view");
    productView.classList.remove("product-view-show");
    productView.classList.add("product-view-hidden");

    setTimeout(() => {
      setShowDetails(false);
      document.body.style.overflow = "auto";
    }, 360);
  };

  const createDetails = (product) => {
    setDetailData(product);
  };

  const highlightSearchMatch = (input, queryClassname) => {
    document.querySelectorAll(`${queryClassname}`).forEach((element) => {
      let result = element.textContent.replace(
        new RegExp(input, "gi"),
        (match) => `<mark>${match}</mark>`
      );
      element.innerHTML = result;
    });
  };

  return {
    handleShowProductDetails,
    handleCloseProductDetails,
    highlightSearchMatch,
    showDetails,
    detailData,
  };
};

export default ProductLogic;
