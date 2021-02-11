import React, { useContext, useEffect, useRef } from "react";

import "./Navbottom.css";
import { Link } from "react-router-dom";
import { CartItemContext } from "../../../../context/CartItemContext";

const Navbottom = ({ link }) => {
  const [state] = useContext(CartItemContext);
  const links = useRef(null);

  let cartCount = state.totalCartItem;

  useEffect(() => {
    if (link != undefined) {
      links.current.children[link].classList.add("active");
    }
  }, []);

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
          <div className="cart-count">{cartCount}</div>
        </Link>
      </ul>
    </div>
  );
};

export default Navbottom;
