import React from "react";

import "./User.css";

const User = ({ userName, userImage }) => {
  return (
    <div className="banner-profile">
      <p>{userName}</p>
      <img src={userImage} alt="user-profile-picture" width="30" height="30" />
    </div>
  );
};

export default User;
