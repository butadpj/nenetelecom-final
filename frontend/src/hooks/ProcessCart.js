import { useContext } from "react";
import { getCustomerBag } from "./query/getCustomerBag";
import { CartItemContext } from "../context/CartItemContext";
import GetCurrentCustomer from "./GetCurrentCustomer";

const ProcessCart = () => {
  const [cartItemState, cartItemDispatch] = useContext(CartItemContext);
  const { customerBag } = getCustomerBag();
  const { djangoCurrentCustomerId } = GetCurrentCustomer();

  let customerBagId;
  customerBag.map((bag) => (customerBagId = bag.id));
  let bagsUrl = "/api/bags/";
  let bagItemUrl = "/api/bag-item/";

  // Process Guest's Cart
  const guestCart = (selectedProduct, price, action, variationPrice) => {
    let price_num = parseInt(variationPrice ? variationPrice : price);

    if (action.toUpperCase() === "ADD") {
      // Adding product in cookie cart
      if (cart[selectedProduct] == undefined) {
        cart[selectedProduct] = {
          quantity: 1,
          total_price: price_num,
          selected: true,
          variation_price: variationPrice,
        };
      } else {
        // Updating product in cookie cart
        cart[selectedProduct]["quantity"] += 1;
        cart[selectedProduct]["variation_price"] = price_num;
        cart[selectedProduct]["total_price"] =
          price_num * cart[selectedProduct]["quantity"];
      }
    }

    // Removing product in cookie cart
    if (action.toUpperCase() === "REMOVE") {
      cart[selectedProduct]["quantity"] -= 1;
      cart[selectedProduct]["total_price"] =
        price_num * cart[selectedProduct]["quantity"];
      cart[selectedProduct]["variation_price"] = price_num;

      if (cart[selectedProduct]["quantity"] <= 0) {
        delete cart[selectedProduct];
      }
    }

    // Save changes in cookie cart
    document.cookie = "cart=" + JSON.stringify(cart) + ";domain=;path=/";

    // Updating products in CartItem State
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
      // Adding product in CartItem State
      let newCartItem = {
        product: selectedProduct,
        total_price: price_num,
        quantity: 1,
      };

      cartItemDispatch({
        type: "ADD_ITEM",
        payload: newCartItem,
      });
    }
    //! ADDING & UPDATING of cart item END
  };

  // Process Logged in User's Cart
  const authenticatedCart = (
    selectedProduct,
    action,
    variationPrice,
    selectedStorageVariation,
    selectedColorVariation
  ) => {
    // Get any existing product using selected product ID
    let existingProduct = cartItemState.cartProducts.filter(
      (data) => data.product === selectedProduct
    );

    if (action.toUpperCase() === "ADD") {
      // If product already in exist in bag, do an UPDATE
      if (existingProduct.length > 0) {
        // UPDATING EXISTING PRODUCT
        let bagItem = existingProduct[0].id;
        existingProduct[0].quantity += 1;

        // Fetch to database
        fetch(`${bagItemUrl}${bagItem}/`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrftoken,
          },
          body: JSON.stringify({
            quantity: existingProduct[0].quantity,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            // Update the state
            cartItemDispatch({
              type: "UPDATE_ITEM",
              payload: {
                id: selectedProduct,
                updatedProduct: data,
              },
            });
          })
          .catch((error) => console.log(error));
      }
      // If product doesn't exist yet, ADD it to bag
      else {
        // ADDING PRODUCT

        // Create a bag if customer has no bag yet, and then add the product item into it
        if (customerBag.length == 0) {
          // Fetch to database
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
              // Fetch to database
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
                  variation_price: variationPrice,
                  storage_variation_name: selectedStorageVariation,
                  color_variation_name: selectedColorVariation,
                }),
              })
                .then((res) => res.json())
                .then((data) => {
                  // Update the state
                  cartItemDispatch({
                    type: "ADD_ITEM",
                    payload: data,
                  });
                })
                .catch((error) => console.log(error));
            })
            .catch((error) => console.log(error));
        }
        // If customer has bag already, just ADD the product item into it
        else {
          // Fetch to database
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
              variation_price: variationPrice,
              storage_variation_name: selectedStorageVariation,
              color_variation_name: selectedColorVariation,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              // Update the state
              cartItemDispatch({
                type: "ADD_ITEM",
                payload: data,
              });
            })
            .catch((error) => console.log(error));
        }
      }
    }
    if (action.toUpperCase() === "REMOVE") {
      //REMOVING PRODUCT

      // Double check if product exist
      if (existingProduct.length > 0) {
        let bagItem = existingProduct[0].id;

        existingProduct[0].quantity -= 1;

        // Reduce the product quantity by 1
        if (existingProduct[0].quantity > 0) {
          fetch(`${bagItemUrl}${bagItem}/`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              "X-CSRFToken": csrftoken,
            },
            body: JSON.stringify({
              quantity: existingProduct[0].quantity,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              cartItemDispatch({
                type: "UPDATE_ITEM",
                payload: {
                  id: selectedProduct,
                  updatedProduct: data,
                },
              });
            })
            .catch((error) => console.log(error));
        }
        // If product quantity reaches 0, delete it from database
        else {
          cartItemDispatch({
            type: "REMOVE_ITEM",
            payload: selectedProduct,
          });
          fetch(`${bagItemUrl}${bagItem}/`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "X-CSRFToken": csrftoken,
            },
          });
        }
      }
      // Show an error if product doesn't exist
      else {
        console.log(
          "There's something wrong, it might be your selected product doesn't exist "
        );
      }
    }
  };

  // Cart's process selector:
  //* If user is logged in, call authenticatedCart
  //* If user is guest, call guestCart
  const processCart = (
    selectedProduct,
    price,
    action,
    isAuthenticated,
    variationPrice,
    selectedStorageVariation,
    selectedColorVariation
  ) => {
    if (!isAuthenticated) {
      guestCart(selectedProduct, price, action, variationPrice);
    } else {
      authenticatedCart(
        selectedProduct,
        action,
        variationPrice,
        selectedStorageVariation,
        selectedColorVariation
      );
    }
  };
  return { processCart };
};

export default ProcessCart;
