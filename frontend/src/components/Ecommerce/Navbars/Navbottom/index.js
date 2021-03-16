import React, { useContext, useEffect, useRef } from "react";

import "./Navbottom.css";
import NavbottomLogic from "./NavbottomLogic";
import GetCurrentCustomer from "../../../../hooks/GetCurrentCustomer";
import { Link } from "react-router-dom";
import { CartItemContext } from "../../../../context/CartItemContext";

import closeIcon from "../../../../assets/svgs/close-dark.svg";
import profileImg from "../../../../assets/images/profile.webp";
import guestImg from "../../../../assets/svgs/guest_user.svg";
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
    djangoCurrentUser,
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
          <div className="icon-container">
            <img
              className="close-icon"
              src={closeIcon}
              alt="close-dark"
              onClick={handleNavClose}
            />
          </div>

          <div className="user-container">
            <div className="user-section">
              {djangoCurrentUser === "AnonymousUser" ? (
                <>
                  <img src={guestImg} alt="profile-img" width="60" />
                  <div className="info">
                    <h4 className="info-name">Guest User</h4>
                    <p className="info-number"></p>
                  </div>
                  <div className="action center">
                    <div className="login">
                      <a href="/store/accounts/login">
                        <Button text="Login" />
                      </a>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <img src={profileImg} alt="profile-img" width="60" />
                  <div className="info">
                    <h4 className="info-name">
                      {djangoCurrentCustomerFullName}
                    </h4>
                    <p className="info-number">
                      {djangoCurrentCustomerMobileNumber}
                    </p>
                  </div>
                  <div className="action">
                    <div className="edit">
                      <Button text="Edit Info" />
                    </div>
                    <div className="logout">
                      <a href="/store/accounts/logout">
                        <Button text="Logout" />
                      </a>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
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
