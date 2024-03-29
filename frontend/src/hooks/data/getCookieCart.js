import { useState, useEffect } from "react";

export const getCookieCart = () => {
  const [cookie, setCookie] = useState([]);
  let cookieCart = [];

  for (let key of Object.keys(cookie)) {
    let item = {};
    item["product"] = key;
    item["quantity"] = cookie[key].quantity;
    item["total_price"] = cookie[key].total_price;
    item["selected"] = cookie[key].selected;
    item["variation_price"] = cookie[key].variation_price;
    item["storage_variation_name"] = cookie[key].storage_variation_name;
    item["color_variation_name"] = cookie[key].color_variation_name;
    cookieCart.push(item);
  }

  useEffect(() => {
    setCookie(cart);
  }, []);

  return { cookieCart };
};
