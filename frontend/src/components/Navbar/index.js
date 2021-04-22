import React, { useRef } from "react";
import "./Navbar.css";
import NavbarLogic from "./NavbarLogic";

const Navbar = ({ navLogoContainer, navListContainer }) => {
  const navContainer = useRef(null);

  const { navToggleIcon, navToggle } = NavbarLogic(
    navContainer.current,
    navLogoContainer.ref.current,
    navListContainer.ref.current
  );

  return (
    <nav ref={navContainer}>
      <ul>
        {navLogoContainer}
        {navListContainer}
        <a
          className="bars"
          onClick={() => navToggle(navListContainer.ref.current)}
        >
          <img src={navToggleIcon} alt="" />
        </a>
      </ul>
    </nav>
  );
};

export default React.memo(Navbar);
