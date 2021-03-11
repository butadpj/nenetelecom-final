import React, { useContext, useEffect, useRef } from "react";

import "./Navbottom.css";
import NavbottomLogic from "./NavbottomLogic";
import GetCurrentCustomer from "../../../../hooks/GetCurrentCustomer";
import { Link } from "react-router-dom";
import { CartItemContext } from "../../../../context/CartItemContext";

import closeIcon from "../../../../assets/svgs/close-dark.svg";
import profileImg from "../../../../assets/images/profile.webp";
import Button from "../../../Button";

const Navbottom = ({ link }) => {
  const {
    showSearch,
    showNav,
    handleSearchShow,
    handleSearchClose,
    handleNavShow,
    handleNavClose,
  } = NavbottomLogic();

  const {
    djangoCurrentCustomerFullName,
    djangoCurrentCustomerMobileNumber,
  } = GetCurrentCustomer();

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
          <img
            className="close-icon"
            src={closeIcon}
            alt="close-dark"
            onClick={handleNavClose}
          />

          <div className="user-section">
            <img src={profileImg} alt="profile-img" width="60" />
            <div className="info">
              <h4 className="info-name">{djangoCurrentCustomerFullName}</h4>
              <p className="info-number">{djangoCurrentCustomerMobileNumber}</p>
            </div>
            <div className="action">
              <div className="edit">
                <Button text="edit info" />
              </div>
              <div className="logout">
                <a href="accounts/logout">
                  <Button text="logout" />
                </a>
              </div>
            </div>
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
