import { useState, useEffect } from "react";
import { getCustomerInfo } from "../../../../hooks/query/getCustomerInfo";
import ProcessCart from "../../../../hooks/ProcessCart";

const ProdctDetailLogic = () => {
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const { processCart } = ProcessCart();
  const { isAuthenticated } = getCustomerInfo();

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
    showAddProductModal,
    handleShowAddProductModal,
    handleCloseAddProductModal,
  };
};

export default ProdctDetailLogic;
