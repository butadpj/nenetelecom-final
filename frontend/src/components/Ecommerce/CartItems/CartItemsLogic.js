import { useContext } from "react";

import { CartItemContext } from "../../../context/CartItemContext";
import GetCurrentCustomer from "../../../hooks/GetCurrentCustomer";
const CartItemsLogic = () => {
  const [state, dispatch] = useContext(CartItemContext);
  const { djangoCurrentUser } = GetCurrentCustomer();

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

  return { selectedItemToggle, state };
};

export default CartItemsLogic;
