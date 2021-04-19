import React, { useReducer, createContext } from "react";
import { reducer } from "../hooks/reducer/productReducer";
import { getProducts } from "../hooks/query/getProducts";

export const ProductContext = createContext();

const initialState = {
  products: [],
  infiniteScroll: {
    products: [],
    isLoading: true,
    hasMore: true,
    offSet: 0,
    limit: 5,
  },
  isLoading: true,
  isSearching: false,
  productSearchInput: "",
  searchedProductList: [],
};

const ProductContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    products,
    productLoading,
    productImageLoading,
    productVariationLoading,
  } = getProducts();

  state.products = products;

  if (!productLoading && !productImageLoading && !productVariationLoading) {
    state.isLoading = false;
  }

  return (
    <ProductContext.Provider value={[state, dispatch]}>
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
