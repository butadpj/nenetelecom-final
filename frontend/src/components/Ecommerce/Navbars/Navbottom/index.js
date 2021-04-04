import React, { useContext, useEffect, useRef } from "react";

import "./Navbottom.css";
import NavbottomLogic from "./NavbottomLogic";
import { Link } from "react-router-dom";
import { CartItemContext } from "../../../../context/CartItemContext";
import closeIconDark from "../../../../assets/svgs/close-dark.svg";
import closeIconRed from "../../../../assets/svgs/close.svg";
import ModalWrapper from "../../../../components/Ecommerce/ModalWrapper";
import PanelGroup from "../../../../components/Ecommerce/PanelGroup";
import PanelTab from "../../../../components/Ecommerce/PanelGroup/PanelTab";
import SearchProductForm from "../../SearchProductForm";
import EditInfo from "../../../../components/Ecommerce/EditInfo";

const Navbottom = ({ link }) => {
  const {
    customerFirstName,
    customerLastName,
    customerFullName,
    customerMobileNumber,
    customerCompleteAddress,
    customerDisplayPicture,
    isAuthenticated,
    isSuperUser,
    showSearch,
    showNav,
    handleSearchShow,
    handleSearchClose,
    handleNavShow,
    handleNavClose,
    userSectionHandler,
    showTalkSellerModal,
    handleShowTalkSellerModal,
    handleCloseTalkSellerModal,
    showEditInfoModal,
    handleShowEditInfoModal,
    handleCloseEditInfoModal,
    guestImg,
    Button,
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
          <Link to="/store/home" onClick={handleSearchShow}>
            <li
              className={`${showSearch ? "nav-search active" : "nav-search"}`}
            >
              <i className="fas fa-search"></i>
            </li>
          </Link>

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
        <section className="nav-content">
          <div className="icon-container">
            <img
              className="close-icon-dark"
              src={closeIconDark}
              alt="close-dark"
              onClick={handleNavClose}
            />
          </div>
          <main className="user-container">
            <div className="user-section">{userSectionHandler()}</div>
          </main>
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
            {isSuperUser ? (
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
            <PanelTab
              cName="chat-with"
              bg="dark"
              icon={<i className="fas fa-phone-alt"></i>}
              text="Talk with our seller"
              functionality={handleShowTalkSellerModal}
            />
            <PanelTab
              cName="faq"
              bg="dark"
              icon={<i className="fas fa-question-circle"></i>}
              text="Frequently Asked Questions"
            />
            <PanelTab
              cName="report"
              bg="dark"
              icon={<i className="fas fa-bug"></i>}
              text="Report a problem"
            />
          </PanelGroup>
        </section>
      ) : null}
      {showSearch ? (
        <div className="search-content">
          <div className="content-wrapper">
            <SearchProductForm />
            <img
              className="close-icon-dark"
              src={closeIconDark}
              alt="close-dark"
              onClick={handleSearchClose}
            />
          </div>
        </div>
      ) : null}
      {showTalkSellerModal ? (
        <ModalWrapper>
          <main className="talk-seller-modal modal-content">
            <section className="info">
              <h4>Select a number to call: </h4>
              <div className="numbers">
                <p>
                  Smart: <a href="tel: +639206796099">0920 679 6099</a>
                </p>

                <p>
                  Globe: <a href="tel: +639151171197">0915 117 1197 </a>
                </p>
              </div>
            </section>

            <div className="modal-close-button">
              <img
                src={closeIconRed}
                alt="close-red"
                onClick={handleCloseTalkSellerModal}
              />
            </div>
          </main>
        </ModalWrapper>
      ) : null}
      {showEditInfoModal ? (
        <EditInfo handleCloseEditInfoModal={handleCloseEditInfoModal} />
      ) : null}
    </>
  );
};

export default Navbottom;
