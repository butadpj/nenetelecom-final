import React, { useState } from "react";
import { getCustomerInfo } from "../../../../hooks/query/getCustomerInfo";
import guestImg from "../../../../assets/svgs/guest_user.svg";
import Button from "../../../Button";

const NavbottomLogic = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [showTalkSellerModal, setShowTalkSellerModal] = useState(false);
  const {
    customerFullName,
    customerMobileNumber,
    customerDisplayPicture,
    isAuthenticated,
    isSuperUser,
  } = getCustomerInfo();

  const handleNavShow = () => {
    setShowNav(true);
    document.body.style.overflow = "hidden";
    if (showSearch) {
      handleSearchClose();
      document.body.style.overflow = "hidden";
    }
  };

  const handleNavClose = () => {
    setShowNav(false);
    document.body.style.overflow = "auto";
  };

  const handleSearchShow = () => {
    setShowSearch(true);
    if (showNav) {
      handleNavClose();
    }
  };

  const handleSearchClose = () => {
    setShowSearch(false);
    document.body.style.overflow = "auto";
  };

  const userSectionHandler = () => {
    let authenticatedImage = (
      <img
        src={!customerDisplayPicture ? guestImg : customerDisplayPicture}
        alt="profile-img"
        width="70"
        height="70"
      />
    );

    let authenticatedAction = (
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
    );

    // If user is not logged in
    if (!isAuthenticated) {
      return (
        <>
          <img src={guestImg} alt="profile-img" width="70" />
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
      );
    }

    // If user is an admin
    if (isSuperUser) {
      return (
        <>
          {authenticatedImage}
          <div className="info">
            <h4 className="info-name">{customerFullName} (🔑)</h4>
            <p className="info-number">{customerMobileNumber}</p>
          </div>
          {authenticatedAction}
        </>
      );
    }

    // If user is logged in
    return (
      <>
        {authenticatedImage}
        <div className="info">
          <h4 className="info-name">{customerFullName}</h4>
          <p className="info-number">{customerMobileNumber}</p>
        </div>
        {authenticatedAction}
      </>
    );
  };

  const handleShowTalkSellerModal = () => {
    setShowTalkSellerModal(true);
  };

  const handleCloseTalkSellerModal = () => {
    setShowTalkSellerModal(false);
  };

  return {
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
  };
};

export default NavbottomLogic;
