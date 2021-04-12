import { useContext, useState } from "react";
import { ProductContext } from "../../../context/ProductContext";

const ProductLogic = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [detailData, setDetailData] = useState();
  const [productState] = useContext(ProductContext);

  let products = productState.products;
  let isLoading = productState.isLoading;
  let searchInput = productState.productSearchInput;

  const handleShowProductDetails = (
    id,
    name,
    price,
    brand,
    image,
    description,
    variation
  ) => {
    setShowDetails(true);
    document.body.style.overflow = "hidden";

    createDetails({
      id: id,
      name: name,
      price: price,
      brand: brand,
      image: image,
      description: description,
      variation: variation,
    });
  };

  const handleCloseProductDetails = () => {
    let productView = document.querySelector(".product-view");
    productView.classList.remove("product-view-show");
    productView.classList.add("product-view-hidden");

    setTimeout(() => {
      setShowDetails(false);
      document.body.style.overflow = "auto";
    }, 385);
  };

  const createDetails = (product) => {
    setDetailData(product);
  };

  return {
    handleShowProductDetails,
    handleCloseProductDetails,
    products,
    isLoading,
    showDetails,
    detailData,
    searchInput,
  };
};

export default ProductLogic;
