import { useContext, useState } from "react";

import { CartItemContext } from "../../../context/CartItemContext";
import { getProducts } from "../../../hooks/query/getProducts";
import ProductLogic from "../../../components/Ecommerce/Product/ProductLogic";
import GetCurrentCustomer from "../../../hooks/GetCurrentCustomer";

const CartItemsLogic = () => {
  const [state, dispatch] = useContext(CartItemContext);
  const { products, productLoading, productImageLoading } = getProducts();
  const { processCart } = ProductLogic();
  const { djangoCurrentUser } = GetCurrentCustomer();

  let cartDisplayProducts = [];
  state.cartProducts.forEach((item) => {
    products.map((product) => {
      if (product.id === item.product) {
        product.quantity = item.quantity;
        product.selected = item.selected;
        cartDisplayProducts.push(product);
      }
    });
  });
  let selectedItems = cartDisplayProducts.filter(
    (item) => item.selected === true
  );

  const noSelected = () => {
    if (selectedItems.length <= 0) {
      return true;
    }
    return false;
  };

  const selectedItemToggle = (selectedItem) => {
    if (djangoCurrentUser === "AnonymousUser") {
      cart[selectedItem]["selected"] = !cart[selectedItem]["selected"];
      document.cookie = "cart=" + JSON.stringify(cart) + ";domain=;path=/";

      let updatedProduct;
      state.cartProducts.forEach((item) => {
        if (item.product === selectedItem) {
          updatedProduct = item;
        }
      });
      dispatch({
        type: "UPDATE_ITEM",
        payload: {
          id: selectedItem,
          updatedProduct: updatedProduct,
        },
      });
    } else {
      let existingProduct = state.cartProducts.filter(
        (item) => item.product === selectedItem
      );

      fetch(`/api/order-product/${existingProduct[0].id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrftoken,
        },
        body: JSON.stringify({ selected: !existingProduct[0].selected }),
      })
        .then((res) => res.json())
        .then((data) => {
          dispatch({
            type: "UPDATE_ITEM_AU",
            payload: {
              id: selectedItem,
              updatedProduct: data,
            },
          });
        })
        .catch((error) => console.log(error));
    }
  };

  return {
    selectedItemToggle,
    state,
    cartDisplayProducts,
    processCart,
    djangoCurrentUser,
    productLoading,
    productImageLoading,
    noSelected,
    selectedItems,
  };
};

export default CartItemsLogic;
