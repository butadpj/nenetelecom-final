import { useContext } from "react";

import { CartItemContext } from "../../../context/CartItemContext";
import { ProductContext } from "../../../context/ProductContext";
import ProductLogic from "../../../components/Ecommerce/Product/ProductLogic";
import GetCurrentCustomer from "../../../hooks/GetCurrentCustomer";

const CartItemsLogic = () => {
  const [cartItemState, cartItemDispatch] = useContext(CartItemContext);
  const [productState] = useContext(ProductContext);
  const { processCart } = ProductLogic();
  const { djangoCurrentUser } = GetCurrentCustomer();

  let products = productState.products;
  let isLoading = productState.isLoading;
  let cartDisplayProducts = [];
  cartItemState.cartProducts.forEach((item) => {
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
    } else {
      let existingProduct = cartItemState.cartProducts.filter(
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
          cartItemDispatch({
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
    cartDisplayProducts,
    processCart,
    djangoCurrentUser,
    isLoading,
    noSelected,
    selectedItems,
  };
};

export default CartItemsLogic;
