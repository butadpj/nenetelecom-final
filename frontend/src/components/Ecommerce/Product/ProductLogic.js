import { useState, useEffect, useContext } from "react";
import { ProductContext } from "../../../context/ProductContext";

import { getProductImageData } from "../../../hooks/data/getProductImageData";
import { getProductVariationData } from "../../../hooks/data/getProductVariationData";

const ProductLogic = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [detailData, setDetailData] = useState();

  const { productImageData } = getProductImageData();
  const { productVariationData } = getProductVariationData();

  const [productState, productDispatch] = useContext(ProductContext);

  let searchInput = productState.productSearchInput;
  let filterInput = productState.filterInput;
  let offSet = productState.infiniteScroll.offSet;
  let limit = productState.infiniteScroll.limit;

  let url = `/api/products/?limit=${limit}&offset=${offSet}`;
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

  const mergeProductData = (data) => {
    let productResults = data
      ? data.map((product) => {
          let imageArray = [];
          let variationArray = [];
          productImageData.forEach((image) => {
            if (image.product == product.id) {
              imageArray.push(image.image);
            }
          });
          productVariationData.forEach((variation) => {
            if (variation.product == product.id) {
              variationArray.push(variation);
            }
          });

          product.image = imageArray;
          product.variation = variationArray;
          return product;
        })
      : [];

    return productResults;
  };

  const loadNextData = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (!data.next) {
        productDispatch({
          type: "NO_MORE_DATA",
          payload: false,
        });
        // setHasMore(false);
      }
      productDispatch({
        type: "SCROLL_PRODUCTS_UPDATE",
        payload: mergeProductData(data.results),
      });
      // setData([...productResults, ...data.results]);
      // setOffSet((prev) => {
      //   return prev + limit;
      // });
    } catch (error) {
      console.error(error);
    }
  };

  const refreshData = () => {
    console.log("REFRESH DAT");
  };

  // Product Search will happen here
  useEffect(() => {
    if (searchInput) {
      let searchResult = []; // Matched search will go here
      let input = searchInput.toLowerCase().replace(/\s+/g, " ").trim();
      productState.products.map((product) => {
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
      productDispatch({
        type: "SEARCH_PRODUCT_LIST_UPDATE",
        payload: searchResult,
      });
    }
  }, [searchInput]);

  // useEffect(() => {
  //   if (isRefreshing) {
  //     setLoading(true);
  //     const refreshData = async () => {
  //       try {
  //         const response = await fetch(url);
  //         const data = await response.json();
  //         if (!data.next) {
  //           setHasMore(false);
  //         }
  //         setData(shuffle([...productResults, ...data.results]));
  //         setLoading(false);
  //         setIsRefreshing(false);
  //         setOffSet((prev) => {
  //           return prev + limit;
  //         });
  //       } catch (error) {
  //         console.error(error);
  //         setLoading(false);
  //       }
  //     };
  //     refreshData();
  //   }
  // }, [isRefreshing]);

  useEffect(() => {
    document.body.style.overflow = "auto";
    document.body.style.overscrollBehaviorY = "contain";
    loadNextData(url);
  }, []);

  return {
    handleShowProductDetails,
    handleCloseProductDetails,
    showDetails,
    detailData,
    productState,
    loadNextData,
    refreshData,
    url,
  };
};

export default ProductLogic;
