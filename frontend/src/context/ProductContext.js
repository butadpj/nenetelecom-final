import React, { useReducer, createContext } from "react";
import { reducer } from "../hooks/reducer/productReducer";
import { getProducts } from "../hooks/query/getProducts";
import ProductLogic from "../components/Ecommerce/Product/ProductLogic";

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
  const { productsData, productLoading } = getProducts();

  // const { infiniteScrollProducts } = ProductLogic();
  // console.log(infiniteScrollProducts);
  state.products = productsData;
  // state.infiniteScroll.products = infiniteScrollProducts;

  if (!productLoading) {
    state.isLoading = false;
  }

  return (
    <ProductContext.Provider value={[state, dispatch]}>
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
