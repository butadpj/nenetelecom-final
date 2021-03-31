import React, { useContext, useEffect, useRef } from "react";

import "./Navbottom.css";
import NavbottomLogic from "./NavbottomLogic";
import { Link } from "react-router-dom";
import { CartItemContext } from "../../../../context/CartItemContext";
import closeIcon from "../../../../assets/svgs/close-dark.svg";

import PanelGroup from "../../../../components/Ecommerce/PanelGroup";
import PanelTab from "../../../../components/Ecommerce/PanelGroup/PanelTab";
import SearchProductForm from "../../SearchProductForm";

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
          <PanelGroup>
            <Link to="/store">
              <PanelTab
                cName="my-feed"
                bg="light"
                isSoon={true}
                icon={<i className="fas fa-rss-square"></i>}
                text="My Feed"
                spanText="Soon..."
              />
            </Link>

            <Link to="/store/my-orders">
              <PanelTab
                cName="my-orders"
                bg="light"
                txtColor="blue"
                isSoon={false}
                icon={<i className="fas fa-clipboard-list"></i>}
                text="My Orders"
              />
            </Link>

            {djangoIsSuperUser === "True" ? (
              <a href="/admin" target="_blank">
                <PanelTab
                  cName="admin-panel"
                  bg="light"
                  txtColor="green"
                  icon={<i className="fas fa-user-cog"></i>}
                  text="Admin Panel"
                />
              </a>
            ) : null}
          </PanelGroup>
          <div className="line-wrapper">
            <hr />
          </div>
          <PanelGroup>
            <a href="https://www.facebook.com/nenetelecom" target="_blank">
              <PanelTab
                cName="chat-with"
                bg="dark"
                icon={<i className="fas fa-comments"></i>}
                text="Chat with our customer specialist"
              />
            </a>
            <a href="#">
              <PanelTab
                cName="faq"
                bg="dark"
                icon={<i className="fas fa-question-circle"></i>}
                text="Frequently Asked Questions"
              />
            </a>
            <a href="#">
              <PanelTab
                cName="report"
                bg="dark"
                icon={<i className="fas fa-bug"></i>}
                text="Report a problem"
              />
            </a>
          </PanelGroup>
        </div>
      ) : null}
      {showSearch ? (
        <div className="search-content">
          <div className="content-wrapper">
            <SearchProductForm />
            <img
              className="close-icon"
              src={closeIcon}
              alt="close-dark"
              onClick={handleSearchClose}
            />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Navbottom;
