import { useContext } from "react";

import { CartItemContext } from "../context/CartItemContext";
import GetCurrentCustomer from "./GetCurrentCustomer";

const ProcessCart = () => {
  const [cartItemState, cartItemDispatch] = useContext(CartItemContext);

  const { djangoCurrentCustomerId } = GetCurrentCustomer();

  let bagsUrl = "/api/bags/";

  let bagItemUrl = "/api/bag-item/";

  const guestCart = (selectedProduct, price, action) => {
    let price_num = parseInt(price);

    if (action.toUpperCase() === "ADD") {
      //* Bake cookie START
      if (cart[selectedProduct] == undefined) {
        cart[selectedProduct] = {
          quantity: 1,
          total_price: price_num,
          selected: true,
        };
      } else {
        cart[selectedProduct]["quantity"] += 1;
        cart[selectedProduct]["total_price"] += price_num;
      }
      //! Bake cookie END
    }

    if (action.toUpperCase() === "REMOVE") {
      cart[selectedProduct]["quantity"] -= 1;
      cart[selectedProduct]["total_price"] -= price_num;
      if (cart[selectedProduct]["quantity"] <= 0) {
        delete cart[selectedProduct];
      }
    }
    document.cookie = "cart=" + JSON.stringify(cart) + ";domain=;path=/";

    //* ADDING & UPDATING of cart item START
    const existingProduct = cartItemState.cartProducts.filter(
      (item) => item.product === selectedProduct
    );
    if (existingProduct.length > 0) {
      cartItemDispatch({
        type: "UPDATE_ITEM",
        payload: {
          id: selectedProduct,
          updatedProduct: existingProduct[0],
        },
      });
    } else {
      let newCartItem = {
        product: selectedProduct,
        total_price: price,
        quantity: 1,
      };

      cartItemDispatch({
        type: "ADD_ITEM",
        payload: newCartItem,
      });
    }
    //! ADDING & UPDATING of cart item END
  };

  const authenticatedCart = (selectedProduct, price, action) => {
    let price_num = parseInt(price);

    let existingProduct = cartItemState.cartProducts.filter(
      (data) => data.product === selectedProduct
    );

    if (action.toUpperCase() === "ADD") {
      if (existingProduct.length > 0) {
        //UPDATING PRODUCT
        let bagItem = existingProduct[0].id;
        let bagItemOrder = existingProduct[0].order;
        existingProduct[0].quantity += 1;
        existingProduct[0].total_price += price_num;

        fetch(`${bagItemUrl}${bagItem}/`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrftoken,
          },
          body: JSON.stringify({
            bag: bagItemOrder,
            product: selectedProduct,
            quantity: existingProduct[0].quantity,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            cartItemDispatch({
              type: "UPDATE_ITEM_AU",
              payload: {
                id: selectedProduct,
                updatedProduct: data,
              },
            });
          })
          .catch((error) => console.log(error));
      } else {
        //ADDING PRODUCT
        //Create bag if customer has no bag yet
        if (customerBag.length == 0) {
          fetch(`${bagsUrl}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-CSRFToken": csrftoken,
            },
            body: JSON.stringify({
              customer: djangoCurrentCustomerId,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              fetch(`${bagItemUrl}`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "X-CSRFToken": csrftoken,
                },
                body: JSON.stringify({
                  bag: data.id,
                  product: selectedProduct,
                  quantity: 1,
                }),
              })
                .then((res) => res.json())
                .then((data) => {
                  console.log(data);
                  cartItemDispatch({
                    type: "ADD_ITEM_AU",
                    payload: data,
                  });
                })
                .catch((error) => console.log(error));
            })
            .catch((error) => console.log(error));
        } else {
          //If customer has already placed an Order
          fetch(`${bagItemUrl}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-CSRFToken": csrftoken,
            },
            body: JSON.stringify({
              bag: customerBagId,
              product: selectedProduct,
              quantity: 1,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              cartItemDispatch({
                type: "ADD_ITEM_AU",
                payload: data,
              });
            })
            .catch((error) => console.log(error));
        }
      }
    }

    if (action.toUpperCase() === "REMOVE") {
      //If product exist
      if (existingProduct.length > 0) {
        let bagItem = existingProduct[0].id;
        let bagItemOrder = existingProduct[0].order;
        existingProduct[0].quantity -= 1;
        existingProduct[0].total_price -= price_num;

        //If quantity is equal to 0
        if (existingProduct[0].quantity <= 0) {
          cartItemDispatch({
            type: "REMOVE_ITEM_AU",
            payload: selectedProduct,
          });
          fetch(`${bagItemUrl}${bagItem}/`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "X-CSRFToken": csrftoken,
            },
          });
        } else {
          fetch(`${bagItemUrl}${bagItem}/`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "X-CSRFToken": csrftoken,
            },
            body: JSON.stringify({
              order: bagItemOrder,
              product: selectedProduct,
              quantity: existingProduct[0].quantity,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              cartItemDispatch({
                type: "UPDATE_ITEM_AU",
                payload: {
                  id: selectedProduct,
                  updatedProduct: data,
                },
              });
            })
            .catch((error) => console.log(error));
        }
      }
    }
  };

  const processCart = (selectedProduct, price, action, isAuthenticated) => {
    if (!isAuthenticated) {
      guestCart(selectedProduct, price, action);
    } else {
      authenticatedCart(selectedProduct, price, action);
    }
  };
  return { processCart };
};

export default ProcessCart;
