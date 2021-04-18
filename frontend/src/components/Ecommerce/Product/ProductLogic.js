import { useState, useEffect, useContext } from "react";
import { ProductContext } from "../../../context/ProductContext";

import ProductResults from "../../../hooks/InfiniteScrollResults/ProductResults";

const ProductLogic = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [detailData, setDetailData] = useState();
  const {
    productResults,
    loading,
    hasMore,
    offSet,
    limit,
    setHasMore,
    setOffSet,
    setLoading,
    setData,
    shuffle,
    isRefreshing,
    setIsRefreshing,
  } = ProductResults();
  const [productState] = useContext(ProductContext);
  let url = `/api/products/?limit=${limit}&offset=${offSet}`;
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
    }, 360);
  };

  const createDetails = (product) => {
    setDetailData(product);
  };

  const highlightSearchMatch = (input, queryClassname) => {
    document.querySelectorAll(`${queryClassname}`).forEach((element) => {
      let result = element.textContent.replace(
        new RegExp(input, "gi"),
        (match) => `<mark>${match}</mark>`
      );
      element.innerHTML = result;
    });
  };

  const loadNextData = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (!data.next) {
        setHasMore(false);
      }
      setData([...productResults, ...data.results]);
      setLoading(false);
      setOffSet((prev) => {
        return prev + limit;
      });
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  let searchResult = []; // Matched search will go here
  // Product Search will happen here
  useEffect(() => {
    let input = searchInput.toLowerCase().replace(/\s+/g, " ").trim();
    productState.products.filter((product) => {
      let name = product.name.toLowerCase().replace(/\s+/g, " ").trim();
      let brand = product.brand.toLowerCase().replace(/\s+/g, " ").trim();
      let condition = product.condition
        .toLowerCase()
        .replace(/\s+/g, " ")
        .trim();
      let price = `${Number(product.price).toLocaleString()}.00`;
      if (
        name.includes(input) ||
        brand.includes(input) ||
        condition.includes(input) ||
        price.includes(input)
      ) {
        highlightSearchMatch(input, ".product .product-name");
        highlightSearchMatch(input, ".product .condition");
        highlightSearchMatch(input, ".product .product-price .current");
        searchResult.push(product); // Push it to search result
      }
    });

    productState.searchedProductList = searchResult; // Put it on searchedProductList
  }, [searchInput]);

  useEffect(() => {
    if (isRefreshing) {
      setLoading(true);
      const refreshData = async () => {
        try {
          const response = await fetch(url);
          const data = await response.json();
          if (!data.next) {
            setHasMore(false);
          }
          setData(shuffle([...productResults, ...data.results]));
          setLoading(false);
          setIsRefreshing(false);
          setOffSet((prev) => {
            return prev + limit;
          });
        } catch (error) {
          console.error(error);
          setLoading(false);
        }
      };
      refreshData();
    }
  }, [isRefreshing]);

  useEffect(() => {
    document.body.style.overflow = "auto";
    document.body.style.overscrollBehaviorY = "contain";
    loadNextData(url);
  }, []);

  return {
    handleShowProductDetails,
    handleCloseProductDetails,
    highlightSearchMatch,
    showDetails,
    detailData,
    productState,
    offSet,
    limit,
    loadNextData,
    loading,
    hasMore,
    productResults,
    setIsRefreshing,
    url,
  };
};

export default ProductLogic;
