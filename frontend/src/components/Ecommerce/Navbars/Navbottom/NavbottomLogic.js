import React, { useState, useContext } from "react";
import { getCustomerInfo } from "../../../../hooks/query/getCustomerInfo";
import { ProductContext } from "../../../../context/ProductContext";
import { CustomerInfoContext } from "../../../../context/CustomerInfoContext";
import guestImg from "../../../../assets/svgs/guest_user.svg";
import Button from "../../../Button";

const NavbottomLogic = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [showTalkSellerModal, setShowTalkSellerModal] = useState(false);
  const [showEditInfoModal, setShowEditInfoModal] = useState(false);

  const { isAuthenticated, isSuperUser } = getCustomerInfo();

  const [state] = useContext(CustomerInfoContext);
  const [productState, productDispatch] = useContext(ProductContext);

  let customerFirstName = state.customerInfo.firstName;
  let customerLastName = state.customerInfo.lastName;
  let customerFullName = state.customerInfo.fullName;
  let customerMobileNumber = state.customerInfo.mobileNumber;
  let customerCompleteAddress = state.customerInfo.completeAddress;
  let customerDisplayPicture = state.customerInfo.displayPicture;

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
    productDispatch({
      type: "IS_SEARCHING_UPDATE",
      payload: true,
    });
  };

  const handleSearchClose = () => {
    setShowSearch(false);
    document.body.style.overflow = "auto";
    productDispatch({
      type: "IS_SEARCHING_UPDATE",
      payload: false,
    });
    productState.productSearchInput = "";
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
          <Button text="Edit Info" functionality={handleShowEditInfoModal} />
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

  const handleShowEditInfoModal = () => {
    setShowEditInfoModal(true);
  };

  const handleCloseEditInfoModal = () => {
    setShowEditInfoModal(false);
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
    showEditInfoModal,
    handleCloseEditInfoModal,
  };
};

export default NavbottomLogic;
