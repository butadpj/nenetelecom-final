import React, { useReducer, createContext } from "react";
import { reducer } from "../hooks/productReducer";
import { getProducts } from "../hooks/query/getProducts";

export const ProductContext = createContext();

const initialState = {
  products: [],
  isLoading: true,
};
const ProductContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { products, productLoading, productImageLoading } = getProducts();

  state.products = products;

  if (!productLoading && !productImageLoading) {
    state.isLoading = false;
  }

  return (
    <ProductContext.Provider value={[state, dispatch]}>
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
