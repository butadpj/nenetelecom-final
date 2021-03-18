import React, { useState, useEffect } from "react";
import "./Header.css";

const Header = ({ icon, text }) => {
  return (
    <header>
      <div className="store-logo">
        <img src={icon} alt="" />
      </div>
      <h3>{text}</h3>
    </header>
  );
};

export default Header;
