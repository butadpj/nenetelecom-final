import React, { useContext } from "react";

import "./Navtop.css";
import User from "../../../../components/Ecommerce/User/";
import Filter from "../../../../components/Ecommerce/Filter/";
import navLogo from "../../../../assets/images/Initials-dark-store.webp";
import guestUserImage from "../../../../assets/svgs/guest_user.svg";

import { getCustomerInfo } from "../../../../hooks/query/getCustomerInfo";
import { CustomerInfoContext } from "../../../../context/CustomerInfoContext";
import { Link } from "react-router-dom";

const Navtop = ({ url }) => {
  const { isAuthenticated } = getCustomerInfo();

  const [state] = useContext(CustomerInfoContext);

  let customerFirstName = state.customerInfo.firstName;
  let customerDisplayPicture = state.customerInfo.displayPicture;
  return (
    <div className="nav-top">
      <section className="header-wrapper">
        <div className="header">
          <Link to={url} className="header-logo">
            <img src={navLogo} alt="" />
          </Link>
          <User
            userName={isAuthenticated ? customerFirstName : "Guest"}
            userImage={
              isAuthenticated
                ? !customerDisplayPicture
                  ? guestUserImage
                  : customerDisplayPicture
                : guestUserImage
            }
          />
        </div>
      </section>
      <Filter />
    </div>
  );
};

export default Navtop;
