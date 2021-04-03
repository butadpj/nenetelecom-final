export const reducer = (state, action) => {
  if (action.type === "SEARCH_PRODUCT") {
    const newProductSearchInput = action.payload;
    return {
      ...state,
      productSearchInput: newProductSearchInput,
    };
  }
};
