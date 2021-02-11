import React, { useContext, useState, useEffect } from "react";
import { CartItemContext } from "../../../context/CartItemContext";
import { getProducts } from "../../../hooks/query/getProducts";

const ProductLogic = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [detailData, setDetailData] = useState();
  const [showAddProductModal, setShowAddProductModal] = useState(false);

  const [state, dispatch] = useContext(CartItemContext);
  const { products } = getProducts();

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

  const handleShowAddProductModal = (selectedProduct) => {
    // //Bake a cookie
    // if (cart[selectedProduct] == undefined) {
    //   cart[selectedProduct] = { quantity: 1 };
    // } else {
    //   cart[selectedProduct]["quantity"] += 1;
    // }
    // document.cookie = "cart=" + JSON.stringify(cart) + ";domain=;path=/";

    let newProduct;
    products.forEach((product) => {
      if (product.id == selectedProduct) {
        newProduct = product;
      }
    });

    let cartItems = state.cartProducts;

    if (cartItems.length == 0) {
      newProduct.quantity = 1;
      dispatch({
        type: "ADD_ITEM",
        payload: newProduct,
      });
    } else {
      const existingProduct = state.cartProducts.filter(
        (item) => item.id === selectedProduct
      );
      if (existingProduct.length > 0) {
        dispatch({
          type: "UPDATE_ITEM",
          payload: {
            id: selectedProduct,
          },
        });
      } else {
        newProduct.quantity = 1;
        dispatch({
          type: "ADD_ITEM",
          payload: newProduct,
        });
      }
    }
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
