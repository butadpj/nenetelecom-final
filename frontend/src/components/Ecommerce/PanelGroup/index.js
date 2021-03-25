import React from "react";

import "./PanelGroup.css";
import GetCurrentCustomer from "../../../hooks/GetCurrentCustomer";
import PanelTab from "./PanelTab";
import { Link } from "react-router-dom";

const PanelGroup = () => {
  const { djangoIsSuperUser } = GetCurrentCustomer();
  return (
    <div className="panel-group">
      <Link to="/store">
        <PanelTab
          cName="my-feed"
          isSoon={true}
          icon={<i className="fas fa-rss-square icon"></i>}
          text="My Feed"
          spanText="Soon..."
        />
      </Link>

      <Link to="/store/my-orders">
        <PanelTab
          cName="my-orders"
          isSoon={false}
          icon={<i className="fas fa-clipboard-list icon"></i>}
          text="My Orders"
        />
      </Link>

      {djangoIsSuperUser === "True" ? (
        <a href="/admin" target="_blank">
          <PanelTab
            cName="admin-panel"
            icon={<i className="fas fa-user-cog icon"></i>}
            text="Admin Panel"
          />
        </a>
      ) : null}
    </div>
  );
};

export default PanelGroup;
