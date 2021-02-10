import React, { useState, useEffect } from "react";
import { getProductsData } from "../../../hooks/getProductsData";
import { getProductImageData } from "../../../hooks/getProductImageData";

const ProductLogic = () => {
  const { productsData } = getProductsData();
  const { productImageData } = getProductImageData();
  const [showDetails, setShowDetails] = useState(false);
  const [detailData, setDetailData] = useState();
  const [showAddProductModal, setShowAddProductModal] = useState(false);

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

  const handleShow = (id, name, price, brand, image, description) => {
    setShowDetails(true);
    document.body.style.overflow = "hidden";

    createDetails({
      id: id,
      name: name,
      price: price,
      brand: brand,
      image: image,
      description: description,
    });
  };

  const handleClose = () => {
    setShowDetails(false);
    document.body.style.overflow = "auto";
  };

  const createDetails = (product) => {
    setDetailData(product);
  };

  const handleShowAddProductModal = (id, action) => {
    setShowAddProductModal(true);
    console.log(id, action);
  };

  const handleCloseAddProductModal = () => {
    setShowAddProductModal(false);
  };

  useEffect(() => {
    let closeTimer = setTimeout(() => {
      handleCloseAddProductModal();
    }, 3000);

    return () => {
      clearTimeout(closeTimer);
    };
  }, [showAddProductModal]);

  return {
    handleShow,
    handleClose,
    products,
    showDetails,
    detailData,
    handleShowAddProductModal,
    handleCloseAddProductModal,
    showAddProductModal,
  };
};

export default ProductLogic;
