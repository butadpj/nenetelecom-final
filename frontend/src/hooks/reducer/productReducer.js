export const reducer = (state, action) => {
  if (action.type === "SEARCH_INPUT") {
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

  if (action.type === "SEARCH_PRODUCT_LIST_UPDATE") {
    return {
      ...state,
      searchedProductList: action.payload,
    };
  }

  if (action.type === "NO_MORE_DATA") {
    return {
      ...state,
      infiniteScroll: {
        ...state.infiniteScroll,
        hasMore: action.payload,
      },
    };
  }

  if (action.type === "SCROLL_PRODUCTS_UPDATE") {
    return {
      ...state,
      infiniteScroll: {
        ...state.infiniteScroll,
        offSet: state.infiniteScroll.offSet + state.infiniteScroll.limit,
        products: [...state.infiniteScroll.products, ...action.payload],
      },
    };
  }
  throw new Error("You didn't catch some action");
};
