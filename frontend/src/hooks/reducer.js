export const reducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    const newCartProducts = [action.payload, ...state.cartProducts];
    return {
      ...state,
      cartProducts: newCartProducts,
    };
  }
  if (action.type === "UPDATE_ITEM") {
    let updatedProduct;
    state.cartProducts.forEach((item) => {
      if (item.product === action.payload.id) {
        updatedProduct = item;
        updatedProduct.quantity += 1;
      }
    });

    const withoutExistingProduct = state.cartProducts.filter(
      (item) => item.product !== action.payload.id
    );

    return {
      ...state,
      cartProducts: [...withoutExistingProduct, updatedProduct],
    };
  }
  throw new Error("You didn't catch some action");
};
