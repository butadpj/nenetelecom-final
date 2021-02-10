export const reducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    const newCartProducts = [...state.cartProducts, action.payload];

    return {
      ...state,
      cartProducts: newCartProducts,
      showModal: true,
    };
  }
  throw new Error("You didn't catch some action");
};
