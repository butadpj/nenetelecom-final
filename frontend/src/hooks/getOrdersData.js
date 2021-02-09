import { useState, useEffect } from "react";
import { useFetch } from "./useFetch";

let ordersUrl = "/api/orders/";

export const getOrdersData = () => {
  const { loading, data } = useFetch(ordersUrl);

  let ordersData = data;
  return { loading, ordersData };
};
