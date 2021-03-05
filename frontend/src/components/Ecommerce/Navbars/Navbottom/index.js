import React, { useContext, useEffect, useRef } from "react";

import "./Navbottom.css";
import NavbottomLogic from "./NavbottomLogic";
import { Link } from "react-router-dom";
import { CartItemContext } from "../../../../context/CartItemContext";

const Navbottom = ({ link }) => {
  const {
    showSearch,
    showNav,
    handleSearchShow,
    handleSearchClose,
    handleNavShow,
    handleNavClose,
  } = NavbottomLogic();
  const [state] = useContext(CartItemContext);
  const links = useRef(null);

  let cartCount = state.totalCartItem;

  useEffect(() => {
    if (link != undefined) {
      links.current.children[link].classList.add("cart-active");
    }
  }, []);

  return (
    <>
      <div className="nav-bottom">
        <ul ref={links}>
          <li
            className={`${showSearch ? "nav-search active" : "nav-search"}`}
            onClick={handleSearchShow}
          >
            <i className="fas fa-search"></i>
          </li>
          <li
            className={`${showNav ? "nav-bars active" : "nav-bars"}`}
            onClick={handleNavShow}
          >
            <i className="fas fa-bars"></i>
          </li>
          <Link to="/store/cart" className="nav-cart">
            <i className="fas fa-shopping-cart"></i>
            <div className="cart-count">{cartCount}</div>
          </Link>
        </ul>
      </div>
      {showNav ? (
        <div className="nav-content">
          <h2>NAV</h2>
        </div>
      ) : null}
      {showSearch ? (
        <div className="search-content">
          <h2>SEARCH</h2>
        </div>
      ) : null}
    </>
  );
};

export default Navbottom;
