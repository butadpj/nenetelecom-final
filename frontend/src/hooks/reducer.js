export const reducer = (state, action) => {
  if (action.type === "SUCCESS") {
    return {
      ...state,
      cartProducts: action.payload,
    };
  }

  if (action.type === "ADD_ITEM") {
    const newCartProducts = [action.payload, ...state.cartProducts];
    return {
      ...state,
      cartProducts: newCartProducts,
    };
  }

  if (action.type === "UPDATE_ITEM") {
    let updatedProduct = action.payload.updatedProduct;

    return {
      ...state,
      cartProducts: [
        ...state.cartProducts.map((item) => {
          if (item.product === action.payload.id) {
            return updatedProduct;
          }
          return item;
        }),
      ],
    };
  }

  // For authenticated users
  if (action.type === "ADD_ITEM_AU") {
    const newCartProducts = [action.payload, ...state.cartProducts];
    return {
      ...state,
      cartProducts: newCartProducts,
    };
  }

  if (action.type === "UPDATE_ITEM_AU") {
    let updatedProduct = action.payload.updatedProduct;

    return {
      ...state,
      cartProducts: [
        ...state.cartProducts.map((item) => {
          if (item.product === action.payload.id) {
            return updatedProduct;
          }
          return item;
        }),
      ],
    };
  }

  if (action.type === "REMOVE_ITEM_AU") {
    const newCartProducts = state.cartProducts.filter(
      (item) => item.product !== action.payload
    );

    return {
      ...state,
      cartProducts: newCartProducts,
    };
  }

  throw new Error("You didn't catch some action");
};
