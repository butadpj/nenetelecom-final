import { useState, useEffect } from "react";
import { getCustomerInfo } from "../../../../hooks/query/getCustomerInfo";
import ProcessCart from "../../../../hooks/ProcessCart";

const ProdctDetailLogic = (options) => {
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const { processCart } = ProcessCart();
  const { isAuthenticated } = getCustomerInfo();
  const [selectedStorageVariation, setSelectedStorageVariation] = useState("");
  const [selectedColorVariation, setSelectedColorVariation] = useState("");
  const [variationPrice, setVariationPrice] = useState(0);

  const handleShowAddProductModal = (
    selectedProduct,
    price,
    action,
    variationPrice
  ) => {
    setShowAddProductModal(true);

    processCart(
      selectedProduct,
      price,
      action,
      isAuthenticated,
      variationPrice
    );
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

  const handleSelectedStorageVariation = (e, optionName, optionPrice) => {
    setSelectedStorageVariation(optionName);
    setVariationPrice(optionPrice);

    // Change detail-price color
    let detailPrice = document.querySelector(".ecommerce .detail-price");
    detailPrice.style.color = "var(--shadeLightDark)";

    let actives = document.querySelectorAll(".option-name.active");
    if (actives.length > 0) {
      actives[0].classList.remove("active");
    }
    e.target.classList.add("active");
  };

  const handleSelectedColorVariation = (selected) => {
    setSelectedColorVariation(selected);
  };

  return {
    showAddProductModal,
    handleShowAddProductModal,
    handleCloseAddProductModal,
    selectedStorageVariation,
    selectedColorVariation,
    handleSelectedStorageVariation,
    handleSelectedColorVariation,
    variationPrice,
  };
};

export default ProdctDetailLogic;
