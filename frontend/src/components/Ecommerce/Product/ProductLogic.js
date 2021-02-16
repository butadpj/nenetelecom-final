import { useContext, useState, useEffect } from "react";
import { CartItemContext } from "../../../context/CartItemContext";
import { getProducts } from "../../../hooks/query/getProducts";
import GetCurrentCustomer from "../../../hooks/GetCurrentCustomer";

const ProductLogic = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [detailData, setDetailData] = useState();
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [state, dispatch] = useContext(CartItemContext);
  const { djangoCurrentUser } = GetCurrentCustomer();
  const { products } = getProducts();

  const refreshPage = () => {
    window.location.reload();
  };

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

  const processGuestCart = (selectedProduct, price, action) => {
    let price_num = parseInt(price);

    if (action.toUpperCase() === "ADD") {
      //* Bake cookie START
      if (cart[selectedProduct] == undefined) {
        cart[selectedProduct] = { quantity: 1, total_price: price_num };
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

    //* Create cart item START
    let newCartItem = [];
    products.forEach((product) => {
      if (product.id == selectedProduct) {
        newCartItem.product = product.id;
        newCartItem.price = product.price;
      }
    });

    //! Create cart item END

    //* ADDING & UPDATING of cart item START
    if (state.cartProducts.length == 0) {
      newCartItem.quantity = 1;
      dispatch({
        type: "ADD_ITEM",
        payload: newCartItem,
      });
    } else {
      const existingProduct = state.cartProducts.filter(
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

  const processAuthenticatedCart = (selectedProduct, price, action) => {
    let price_num = parseInt(price);

    let existingProduct = state.cartProducts.filter(
      (data) => data.product === selectedProduct
    );

    if (action.toUpperCase() === "ADD") {
      let op_id = existingProduct[0].id;
      let op_order = existingProduct[0].order;
      existingProduct[0].quantity += 1;
      existingProduct[0].total_price += price_num;

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
            quantity: existingProduct[0].quantity,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            dispatch({
              type: "UPDATE_ITEM_AU",
              payload: {
                id: selectedProduct,
                updatedProduct: data,
              },
            });
          })
          .catch((error) => console.log(error));
      } else {
        console.log("ADD");
      }
    }

    if (action.toUpperCase() === "REMOVE") {
      let op_id = existingProduct[0].id;
      let op_order = existingProduct[0].order;
      existingProduct[0].quantity -= 1;
      existingProduct[0].total_price -= price_num;

      //If product exist
      if (existingProduct.length > 0) {
        //If quantity is equal to 0
        if (existingProduct[0].quantity <= 0) {
          fetch(`/api/order-product/${op_id}/`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "X-CSRFToken": csrftoken,
            },
          }).then(() => {
            refreshPage();
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
              console.log(data);
              dispatch({
                type: "UPDATE_ITEM_AU",
                payload: {
                  id: selectedProduct,
                  updatedProduct: data,
                },
              });
            })
            .catch((error) => console.log(error));
        }
      } else {
        console.log("ADD");
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
    processCart,
  };
};

export default ProductLogic;
