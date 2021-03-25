import React, { useContext, useEffect, useRef } from "react";

import "./Navbottom.css";
import NavbottomLogic from "./NavbottomLogic";
import { Link } from "react-router-dom";
import { CartItemContext } from "../../../../context/CartItemContext";
import closeIcon from "../../../../assets/svgs/close-dark.svg";
import PanelGroup from "../../PanelGroup";

const Navbottom = ({ link }) => {
  const {
    showSearch,
    showNav,
    handleSearchShow,
    handleSearchClose,
    handleNavShow,
    handleNavClose,
    djangoIsSuperUser,
    userSectionHandler,
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
          <div className="icon-container">
            <img
              className="close-icon"
              src={closeIcon}
              alt="close-dark"
              onClick={handleNavClose}
            />
          </div>
          <div className="user-container">
            <div className="user-section">{userSectionHandler()}</div>
          </div>
          <div className="line-wrapper">
            <hr />
          </div>
          <PanelGroup />
          <div className="line-wrapper">
            <hr />
          </div>
        </div>
      ) : null}
      {showSearch ? (
        <div className="search-content">
          <img
            className="close-icon"
            src={closeIcon}
            alt="close-dark"
            onClick={handleSearchClose}
          />
        </div>
      ) : null}
    </>
  );
};

export default Navbottom;
