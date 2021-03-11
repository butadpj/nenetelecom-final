import { useState } from "react";

const NavbottomLogic = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [showNav, setShowNav] = useState(false);

  const handleNavShow = () => {
    setShowNav(true);
    document.body.style.overflow = "hidden";
    if (showSearch) {
      handleSearchClose();
      document.body.style.overflow = "hidden";
    }
  };

  const handleNavClose = () => {
    setShowNav(false);
    document.body.style.overflow = "auto";
  };

  const handleSearchShow = () => {
    setShowSearch(true);
    document.body.style.overflow = "hidden";
    if (showNav) {
      handleNavClose();
      document.body.style.overflow = "hidden";
    }
  };

  const handleSearchClose = () => {
    setShowSearch(false);
    document.body.style.overflow = "auto";
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
