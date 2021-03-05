import { useState } from "react";

const NavbottomLogic = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [showNav, setShowNav] = useState(false);

  const handleNavShow = () => {
    setShowNav(true);
    document.body.style.overflow = "hidden";
    if (showSearch) {
      handleSearchClose();
    }
  };

  const handleNavClose = () => {
    setShowNav(false);
  };

  const handleSearchShow = () => {
    setShowSearch(true);
    if (showNav) {
      handleNavClose();
    }
  };

  const handleSearchClose = () => {
    setShowSearch(false);
  };

  return {
    showSearch,
    showNav,
    handleSearchShow,
    handleSearchClose,
    handleNavShow,
    handleNavClose,
  };
};

export default NavbottomLogic;
