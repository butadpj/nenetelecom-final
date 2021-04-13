export const reducer = (state, action) => {
  if (action.type === "SEARCH_PRODUCT") {
    const newProductSearchInput = action.payload;
    return {
      ...state,
      productSearchInput: newProductSearchInput,
    };
  }

  if (action.type === "IS_SEARCHING_UPDATE") {
    return {
      ...state,
      isSearching: action.payload,
    };
  }
  throw new Error("You didn't catch some action");
};
