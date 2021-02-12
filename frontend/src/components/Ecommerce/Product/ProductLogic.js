import React, { useContext, useState, useEffect } from "react";
import { CartItemContext } from "../../../context/CartItemContext";
import { getProducts } from "../../../hooks/query/getProducts";
import { getCustomerOrderProduct } from "../../../hooks/query/getCustomerOrderProduct";
import GetCurrentCustomer from "../../../hooks/GetCurrentCustomer";

const ProductLogic = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [detailData, setDetailData] = useState();
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [state, dispatch] = useContext(CartItemContext);
  const { djangoCurrentUser } = GetCurrentCustomer();
  const { customerOrderProduct } = getCustomerOrderProduct();
  const { products } = getProducts();

  const cartItems = state.cartProducts;

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

  const processGuestCart = (selectedProduct) => {
    //* Bake cookie START
    if (cart[selectedProduct] == undefined) {
      cart[selectedProduct] = { quantity: 1 };
    } else {
      cart[selectedProduct]["quantity"] += 1;
    }
    document.cookie = "cart=" + JSON.stringify(cart) + ";domain=;path=/";
    //! Bake cookie END

    //* Create cart item START
    let newCartItem = [];
    products.forEach((product) => {
      if (product.id == selectedProduct) {
        newCartItem.product = product.id;
      }
    });
    //! Create cart item END

    //* ADDING & UPDATING of cart item START
    if (cartItems.length == 0) {
      newCartItem.quantity = 1;
      dispatch({
        type: "ADD_ITEM",
        payload: newCartItem,
      });
    } else {
      const existingProduct = cartItems.filter(
        (item) => item.product === selectedProduct
      );
      if (existingProduct.length > 0) {
        dispatch({
          type: "UPDATE_ITEM",
          payload: {
            id: selectedProduct,
          },
        });
      } else {
        newCartItem.quantity = 1;
        dispatch({
          type: "ADD_ITEM",
          payload: newCartItem,
        });
      }
    }
    //! ADDING & UPDATING of cart item END
  };

  const processAuthenticatedCart = (selectedProduct) => {
    customerOrderProduct.forEach((op) => {
      //* Bake cookie START
      if (cart[selectedProduct] == undefined) {
        cart[selectedProduct] = { quantity: 1 };
      } else {
        cart[selectedProduct]["quantity"] += 1;
      }
      document.cookie = "cart=" + JSON.stringify(cart) + ";domain=;path=/";
      //! Bake cookie END
    });

    let existingProduct = customerOrderProduct.filter(
      (data) => data.product === selectedProduct
    );
    let op_id = existingProduct[0].id;
    let op_order = existingProduct[0].order;
    let op_quantity = existingProduct[0].quantity + 1;

    if (existingProduct.length > 0) {
      fetch(`/api/order-product/${op_id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrftoken,
        },
        body: JSON.stringify({
          order: op_order,
          product: selectedProduct,
          quantity: op_quantity,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          dispatch({
            type: "UPDATE_ITEM_AU",
            payload: {
              id: selectedProduct,
              updatedProduct: data,
            },
          });
        });
    } else {
      console.log("ADD");
    }
  };

  const handleShowAddProductModal = (selectedProduct) => {
    setShowAddProductModal(true);

    if (djangoCurrentUser === "AnonymousUser") {
      processGuestCart(selectedProduct);
    } else {
      processAuthenticatedCart(selectedProduct);
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
