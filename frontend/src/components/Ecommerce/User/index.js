import React from "react";

import "./User.css";

const User = ({ userName, userImage }) => {
  return (
    <div className="banner-profile">
      <p>{userName}</p>
      <img src={userImage} alt="user-profile-picture" width="40" height="40" />
    </div>
  );
};

export default User;
