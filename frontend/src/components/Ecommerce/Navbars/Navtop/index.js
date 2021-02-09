import React, { useEffect, useState } from "react";

import "./Navtop.css";
import User from "../../../../components/Ecommerce/User/";
import Filter from "../../../../components/Ecommerce/Filter/";
import navLogo from "../../../../assets/images/Initials-dark-store.webp";
import userImage from "../../../../assets/images/profile.webp";
import guestUserImage from "../../../../assets/svgs/guest_user.svg";
import GetCurrentCustomer from "../../../../hooks/GetCurrentCustomer";

const customersUrl = "/api/customers/";

import { Link } from "react-router-dom";

const Navtop = ({ url }) => {
  const [customers, setCustomers] = useState([]);

  const { djangoCurrentUser, djangoCurrentCustomer } = GetCurrentCustomer();

  const getCustomers = async () => {
    const response = await fetch(customersUrl);
    const data = await response.json();
    setCustomers(data);
  };

  useEffect(() => {
    getCustomers();
  }, [customersUrl]);

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
              : djangoCurrentCustomer
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
