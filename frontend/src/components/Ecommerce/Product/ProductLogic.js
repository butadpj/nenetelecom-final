import React, { useState, useEffect } from "react";

const productsUrl = "/api/products/";
const productImageUrl = "/api/product-image/";

const ProductLogic = () => {
  const [products, setProducts] = useState([]);
  const [productImage, setProductImage] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [detailData, setDetailData] = useState();
  const [showAddProductModal, setShowAddProductModal] = useState(false);

  useEffect(() => {
    getProducts();
    getProductImage();
  }, [productsUrl, productImageUrl]);

  const getProducts = async () => {
    const response = await fetch(productsUrl);
    const data = await response.json();
    setProducts(data);
  };

  const getProductImage = async () => {
    const response = await fetch(productImageUrl);
    const data = await response.json();
    setProductImage(data);
  };

  let productImages = productImage.map((prod) => {
    return prod;
  });

  let finalProducts = products.map((product) => {
    let imageArray = [];

    productImages.forEach((image) => {
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

    const url = "/update_item/";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify({ product_id: id, action: action }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        location.reload();
      });
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
    finalProducts,
    showDetails,
    detailData,
    handleShowAddProductModal,
    handleCloseAddProductModal,
    showAddProductModal,
  };
};

export default ProductLogic;
