import React, { useState } from "react";
import GetCurrentCustomer from "../../../../hooks/GetCurrentCustomer";
import profileImg from "../../../../assets/images/profile.webp";
import guestImg from "../../../../assets/svgs/guest_user.svg";
import Button from "../../../Button";

const NavbottomLogic = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [showTalkSellerModal, setShowTalkSellerModal] = useState(false);

  const {
    djangoCurrentUser,
    djangoCurrentCustomerFullName,
    djangoCurrentCustomerMobileNumber,
    djangoIsSuperUser,
  } = GetCurrentCustomer();

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
    if (djangoCurrentUser === "AnonymousUser") {
      return (
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
      );
    }

    if (djangoIsSuperUser === "True") {
      return (
        <>
          <img src={profileImg} alt="profile-img" width="60" />
          <div className="info">
            <h4 className="info-name">{djangoCurrentCustomerFullName} (🔑)</h4>
            <p className="info-number">{djangoCurrentCustomerMobileNumber}</p>
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
      );
    }

    return (
      <>
        <img src={profileImg} alt="profile-img" width="60" />
        <div className="info">
          <h4 className="info-name">{djangoCurrentCustomerFullName}</h4>
          <p className="info-number">{djangoCurrentCustomerMobileNumber}</p>
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
    );
  };

  const handleShowTalkSellerModal = () => {
    setShowTalkSellerModal(true);
  };

  const handleCloseTalkSellerModal = () => {
    setShowTalkSellerModal(false);
  };

  return {
    showSearch,
    showNav,
    handleSearchShow,
    handleSearchClose,
    handleNavShow,
    handleNavClose,
    djangoIsSuperUser,
    userSectionHandler,
    showTalkSellerModal,
    handleShowTalkSellerModal,
    handleCloseTalkSellerModal,
  };
};

export default NavbottomLogic;
