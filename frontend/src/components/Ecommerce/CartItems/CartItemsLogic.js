import { useContext } from "react";

import { CartItemContext } from "../../../context/CartItemContext";
import { ProductContext } from "../../../context/ProductContext";
import ProcessCart from "../../../hooks/ProcessCart";
import { getCustomerInfo } from "../../../hooks/query/getCustomerInfo";

const CartItemsLogic = () => {
  const [cartItemState, cartItemDispatch] = useContext(CartItemContext);
  const [productState] = useContext(ProductContext);
  const { processCart } = ProcessCart();
  const { isAuthenticated } = getCustomerInfo();
  let products = productState.products;
  let isLoading = productState.isLoading;
  let cartDisplayProducts = [];

  cartItemState.cartProducts.forEach((item) => {
    if (item.product) {
      products.map((product) => {
        if (product.id === item.product) {
          product.quantity = item.quantity;
          product.selected = item.selected;
          product.storage_variation_name = item.storage_variation_name;
          product.color_variation_name = item.color_variation_name;
          product.variation_price = item.variation_price;
          cartDisplayProducts.push(product);
        }
      });
    }
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
    if (isAuthenticated) {
      let existingProduct = cartItemState.cartProducts.filter(
        (item) => item.product === selectedItem
      );

      fetch(`/api/bag-item/${existingProduct[0].id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrftoken,
        },
        body: JSON.stringify({ selected: !existingProduct[0].selected }),
      })
        .then((res) => res.json())
        .then((data) => {
          cartItemDispatch({
            type: "UPDATE_ITEM",
            payload: {
              id: selectedItem,
              updatedProduct: data,
            },
          });
        })
        .catch((error) => console.log(error));
    } else {
      cart[selectedItem]["selected"] = !cart[selectedItem]["selected"];
      document.cookie = "cart=" + JSON.stringify(cart) + ";domain=;path=/";

      let updatedProduct;
      cartItemState.cartProducts.forEach((item) => {
        if (item.product === selectedItem) {
          updatedProduct = item;
        }
      });
      cartItemDispatch({
        type: "UPDATE_ITEM",
        payload: {
          id: selectedItem,
          updatedProduct: updatedProduct,
        },
      });
    }
  };

  return {
    selectedItemToggle,
    cartDisplayProducts,
    processCart,
    isAuthenticated,
    isLoading,
    noSelected,
    selectedItems,
  };
};

export default CartItemsLogic;
