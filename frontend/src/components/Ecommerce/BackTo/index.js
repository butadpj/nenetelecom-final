import React, { useContext } from "react";
import { Link } from "react-router-dom";
import GetCurrentCustomer from "../../../hooks/GetCurrentCustomer";
import { CartItemContext } from "../../../context/CartItemContext";

import "./BackTo.css";

const BackTo = ({ linkText, link, icon }) => {
  const { djangoCurrentUser } = GetCurrentCustomer();
  const [state] = useContext(CartItemContext);
  let orders = state.orders;

  return (
    <div className="back-to-wrapper">
      <div className="back-to">
        <div className="link">
          <Link to={link}>
            <i className="fas fa-arrow-circle-left"></i>
          </Link>
          <span>
            {linkText} {icon}
          </span>
        </div>
        {djangoCurrentUser === "AnonymousUser" ? (
          <div className="view-orders-link">
            <a href="/store/accounts/login">
              <h5>Login to save orders {`>`}</h5>
            </a>
          </div>
        ) : orders.length > 0 ? (
          <div className="view-orders-link">
            <Link to="/store/my-orders">
              <h5>View All Orders {`>`}</h5>
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default BackTo;
