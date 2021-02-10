import React, { useReducer, createContext } from "react";

import { reducer } from "../hooks/reducer";

export const CartItemContext = createContext();

const initalState = {
  cartProducts: [
    {
      url:
        "http://127.0.0.1:8000/api/products/4f33c139-b19a-4231-b198-e2a9bb5e7b62/",
      id: "4f33c139-b19a-4231-b198-e2a9bb5e7b62",
      category: "Phones",
      brand: "Samsung",
      name: "Samsung Galaxy S Duos",
      price: "399.00",
      description:
        "Hey this is dsadsadsadsadasdsadsadasdasas\r\nsadasdasdasdasd\r\nsadsdasdas\r\n\r\n=====================\r\n0950 786 7559",
      date_posted: "2021-02-06T18:10:19.875675Z",
      quantity: 1,
    },
    {
      url:
        "http://127.0.0.1:8000/api/products/9cd3ffa4-0174-4a29-a88d-20696346eea7/",
      id: "9cd3ffa4-0174-4a29-a88d-20696346eea7",
      category: "Phones",
      brand: "iPhone",
      name: "iPhone 12s",
      price: "39000.00",
      description:
        "IPHONE\r\nIASDAS\r\nDADAS\r\nDASDADAA\r\nASASASADSDDADADSADASDSADASDASAS\r\nASDSADSAAAAAAAAAAAAA\r\nDSAASDSADSSASADSA",
      date_posted: "2021-02-06T18:32:52.270429Z",
      quantity: 1,
    },
  ],
  showModal: false,
  totalCartItem: 0,
};

export const CartItemContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initalState);
  return (
    <CartItemContext.Provider value={[state, dispatch]}>
      {props.children}
    </CartItemContext.Provider>
  );
};
