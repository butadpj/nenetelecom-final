import { useContext, useState, useEffect } from "react";
import { CartItemContext } from "../../../context/CartItemContext";
import { ProductContext } from "../../../context/ProductContext";
import GetCurrentCustomer from "../../../hooks/GetCurrentCustomer";
import { getCustomerBag } from "../../../hooks/query/getCustomerBag";
import { getCustomerInfo } from "../../../hooks/query/getCustomerInfo";

const ProductLogic = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [detailData, setDetailData] = useState();
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [cartItemState, cartItemDispatch] = useContext(CartItemContext);
  const [productState] = useContext(ProductContext);
  const { djangoCurrentCustomerId } = GetCurrentCustomer();
  const { customerBag } = getCustomerBag();
  const { isAuthenticated } = getCustomerInfo();

  let customerBagId;
  customerBag.map((bag) => (customerBagId = bag.id));

  let products = productState.products;
  let isLoading = productState.isLoading;
  let searchInput = productState.productSearchInput;

  let bagsUrl = "/api/bags/";
  let bagItemUrl = "/api/bag-item/";

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
      processGuestCart(selectedProduct, price, action);
    } else {
      processAuthenticatedCart(selectedProduct, price, action);
    }
  };

  const handleShowAddProductModal = (selectedProduct, price, action) => {
    setShowAddProductModal(true);

    processCart(selectedProduct, price, action, isAuthenticated);
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
    searchInput,
  };
};

export default ProductLogic;
