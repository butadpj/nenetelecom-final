import { useState, useEffect } from "react";
import bars from "../../assets/svgs/bars-solid.svg";
import close from "../../assets/svgs/times-solid.svg";
import { animateScroll as scroll } from "react-scroll";

const NavbarLogic = () => {
  const [showSideNav, setShowSideNav] = useState(false);
  const [navToggleIcon, setNavToggleIcon] = useState(bars);

  const [lastY, setLastY] = useState(window.pageYOffset);
  const [offsetY, setOffsetY] = useState(window.pageYOffset);

  const [width, setWidth] = useState(window.innerWidth);
  const [isMobile, setIsMobile] = useState(false);

  const [isDark, setIsDark] = useState(false);

  const navToggle = (navListContainer) => {
    if (showSideNav == false) {
      setNavToggleIcon(close);
      if (navListContainer != null) {
        navListContainer.classList.add("show");
      }
      setShowSideNav(true);
    } else {
      setNavToggleIcon(bars);
      if (navListContainer != null) {
        navListContainer.classList.remove("show");
      }
      setShowSideNav(false);
    }
  };
  const scrollToTop = () => {
    scroll.scrollToTop();
  };
  const navDarkApply = (navContainer) => {
    navContainer.current.style.opacity = "100%";
    navContainer.current.style.height = "13vh";
  };
  const navLightApply = (navContainer, navListContainer) => {
    navContainer.current.style.opacity = "70%";
    navContainer.current.style.height = "8vh";

    if (navListContainer != null) {
      navListContainer.classList.remove("show");
    }

    setNavToggleIcon(bars);
    setShowSideNav(false);
  };

  const handleResize = () => {
    if (width <= 1073) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [width]);

  const checkOffsetY = () => {
    setOffsetY(window.pageYOffset);
    setLastY(offsetY);
  };

  return {
    showSideNav,
    navToggleIcon,
    navToggle,
    navDarkApply,
    navLightApply,
    scrollToTop,
    checkOffsetY,
    handleResize,
    isMobile,
    lastY,
    offsetY,
    isDark,
    setIsDark,
  };
};

export default NavbarLogic;
