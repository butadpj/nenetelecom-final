import { useState, useEffect } from "react";

export const getCookieCart = () => {
  const [cookie, setCookie] = useState([]);
  let cookieCart = [];

  for (let key of Object.keys(cookie)) {
    let item = {};
    item["product"] = key;
    item["quantity"] = cookie[key].quantity;
    cookieCart.push(item);
  }

  useEffect(() => {
    setCookie(cart);
  }, []);

  return { cookieCart };
};
