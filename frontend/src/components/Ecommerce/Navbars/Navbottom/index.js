import React, { useState, useEffect, useRef } from "react";

import "./Navbottom.css";
import { Link } from "react-router-dom";
import GetCurrentCustomer from "../../../../hooks/GetCurrentCustomer";
import { getOrdersData } from "../../../../hooks/getOrdersData";

const Navbottom = ({ link }) => {
  const { djangoCurrentCustomerId } = GetCurrentCustomer();
  const { ordersData } = getOrdersData();
  const links = useRef(null);

  let cartCount;

  useEffect(() => {
    if (link != undefined) {
      links.current.children[link].classList.add("active");
    }
  }, []);

  ordersData.forEach((data) => {
    if (data.customer == djangoCurrentCustomerId) {
      cartCount = data.total_cart_items;
    }
  });

  return (
    <div className="nav-bottom">
      <ul ref={links}>
        <li className="nav-search">
          <i className="fas fa-search"></i>
        </li>
        <li className="nav-bars">
          <i className="fas fa-bars"></i>
        </li>
        <Link to="/store/cart" className="nav-cart">
          <i className="fas fa-shopping-cart"></i>
          <div className="cart-count">{cartCount || 0}</div>
        </Link>
      </ul>
    </div>
  );
};

export default Navbottom;
