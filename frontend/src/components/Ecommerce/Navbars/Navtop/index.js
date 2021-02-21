import React, { useEffect, useState } from "react";

import "./Navtop.css";
import User from "../../../../components/Ecommerce/User/";
import Filter from "../../../../components/Ecommerce/Filter/";
import navLogo from "../../../../assets/images/Initials-dark-store.webp";
import userImage from "../../../../assets/images/profile.webp";
import guestUserImage from "../../../../assets/svgs/guest_user.svg";
import GetCurrentCustomer from "../../../../hooks/GetCurrentCustomer";

import { Link } from "react-router-dom";

const Navtop = ({ url }) => {
  const {
    djangoCurrentUser,
    djangoCurrentCustomerFirstName,
  } = GetCurrentCustomer();

  return (
    <div className="nav-top">
      <ul className="header">
        <Link to={url} className="header-logo">
          <img src={navLogo} alt="" />
        </Link>
        <User
          userName={
            djangoCurrentUser === "AnonymousUser"
              ? "Guest"
              : djangoCurrentCustomerFirstName
          }
          userImage={
            djangoCurrentUser === "AnonymousUser" ? guestUserImage : userImage
          }
        />
      </ul>
      <Filter />
    </div>
  );
};

export default Navtop;
