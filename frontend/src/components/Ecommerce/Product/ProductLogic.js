import { useContext, useState, useEffect } from "react";
import { CartItemContext } from "../../../context/CartItemContext";
import { ProductContext } from "../../../context/ProductContext";
import GetCurrentCustomer from "../../../hooks/GetCurrentCustomer";
import { getCustomerOrderProduct } from "../../../hooks/query/getCustomerOrderProduct";

const ProductLogic = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [detailData, setDetailData] = useState();
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [cartItemState, cartItemDispatch] = useContext(CartItemContext);
  const [productState] = useContext(ProductContext);
  const { djangoCurrentUser, djangoCurrentCustomerId } = GetCurrentCustomer();
  const { notCompletedCustomerOrder } = getCustomerOrderProduct();

  let products = productState.products;
  let isLoading = productState.isLoading;
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
    let productView = document.querySelector(".product-view");
    productView.classList.remove("product-view-show");
    productView.classList.add("product-view-hidden");

    setTimeout(() => {
      setShowDetails(false);
      document.body.style.overflow = "auto";
    }, 360);
  };

  const createDetails = (product) => {
    setDetailData(product);
  };

  const processGuestCart = (selectedProduct, price, action) => {
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

  const processAuthenticatedCart = (selectedProduct, price, action) => {
    let price_num = parseInt(price);

    let existingProduct = cartItemState.cartProducts.filter(
      (data) => data.product === selectedProduct
    );

    if (action.toUpperCase() === "ADD") {
      if (existingProduct.length > 0) {
        //UPDATING PRODUCT
        let op_id = existingProduct[0].id;
        let op_order = existingProduct[0].order;
        existingProduct[0].quantity += 1;
        existingProduct[0].total_price += price_num;

        fetch(`/api/order-product/${op_id}/`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrftoken,
          },
          body: JSON.stringify({
            order: op_order,
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
        //Create order if customer has no order yet
        if (notCompletedCustomerOrder.length == 0) {
          fetch(`/api/orders/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-CSRFToken": csrftoken,
            },
            body: JSON.stringify({
              customer: djangoCurrentCustomerId,
              confirmed: false,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              fetch(`/api/order-product/`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "X-CSRFToken": csrftoken,
                },
                body: JSON.stringify({
                  order: data.transaction_id,
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
          fetch(`/api/order-product/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-CSRFToken": csrftoken,
            },
            body: JSON.stringify({
              order: notCompletedCustomerOrder[0].transaction_id,
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
        let op_id = existingProduct[0].id;
        let op_order = existingProduct[0].order;
        existingProduct[0].quantity -= 1;
        existingProduct[0].total_price -= price_num;

        //If quantity is equal to 0
        if (existingProduct[0].quantity <= 0) {
          cartItemDispatch({
            type: "REMOVE_ITEM_AU",
            payload: selectedProduct,
          });
          fetch(`/api/order-product/${op_id}/`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "X-CSRFToken": csrftoken,
            },
          });
        } else {
          fetch(`/api/order-product/${op_id}/`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "X-CSRFToken": csrftoken,
            },
            body: JSON.stringify({
              order: op_order,
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

  const processCart = (selectedProduct, price, action, user) => {
    if (user === "AnonymousUser") {
      processGuestCart(selectedProduct, price, action);
    } else {
      processAuthenticatedCart(selectedProduct, price, action);
    }
  };

  const handleShowAddProductModal = (selectedProduct, price, action) => {
    setShowAddProductModal(true);

    processCart(selectedProduct, price, action, djangoCurrentUser);
  };

  const handleCloseAddProductModal = () => {
    let addProductModal = document.querySelector(".add-product-modal");
    if (addProductModal != null) {
      addProductModal.classList.remove("add-product-modal-show");
      addProductModal.classList.add("add-product-modal-hidden");
    }

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
    isLoading,
    showDetails,
    detailData,
    handleShowAddProductModal,
    handleCloseAddProductModal,
    showAddProductModal,
    processCart,
  };
};

export default ProductLogic;
