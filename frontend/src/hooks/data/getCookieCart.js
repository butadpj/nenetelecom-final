import { useState, useEffect } from "react";

export const getCookieCart = () => {
  const [cookieCart, setCookieCart] = useState([]);
  useEffect(() => {
    setCookieCart(cart);
  }, []);
  return { cookieCart };
};
