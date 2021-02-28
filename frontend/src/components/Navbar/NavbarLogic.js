import { useState, useEffect } from "react";
import bars from "../../assets/svgs/bars-solid.svg";
import close from "../../assets/svgs/times-solid.svg";
import { animateScroll as scroll } from "react-scroll";

const NavbarLogic = (navContainer, navLogoContainer, navListContainer) => {
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
    navContainer.style.opacity = "100%";
    navContainer.style.height = "13vh";
  };
  const navLightApply = (navContainer, navListContainer) => {
    navContainer.style.opacity = "70%";
    navContainer.style.height = "8vh";

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

  const checkOffsetY = () => {
    setOffsetY(window.pageYOffset);
    setLastY(offsetY);
  };

  //? Window Resize Handler - START
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [width]);
  //! Window Resize Handler - END

  //? Navbar hover and dynamic resize functionality - START
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      if (navContainer) {
        navContainer.addEventListener("mouseover", () =>
          navDarkApply(navContainer)
        );
      }

      if (navContainer) {
        navContainer.addEventListener("mouseleave", () =>
          navLightApply(navContainer, navListContainer)
        );
      }

      if (navLogoContainer) {
        handleResize();
        if (isMobile == true) {
          navLogoContainer.style.display = "block";
        }
      }
    }

    return () => {
      if (navContainer) {
        navContainer.removeEventListener("mouseover", () =>
          navDarkApply(navContainer)
        );
      }

      if (navContainer) {
        navContainer.removeEventListener("mouseleave", () =>
          navLightApply(navContainer, navListContainer)
        );
      }

      isMounted = false;
    };
  });
  //! Navbar hover and dynamic resize functionality - END

  //? ANY DEVICE - Transparent Navbar functionality - START
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      if (navContainer) {
        if (offsetY >= 500 && isMobile == true) {
          navContainer.style.position = "fixed";
          navContainer.classList.add("nav-bottom");
          navContainer.classList.remove("nav-fade-in");

          setIsDark(true);
        } else if (offsetY <= 5 && isMobile == true) {
          if (isDark == true) {
            if (offsetY <= 5) {
              navContainer.style.position = "relative";
              navContainer.classList.remove("nav-bottom");
              navContainer.classList.add("nav-fade-in");
              navContainer.style.height = "13vh";

              setIsDark(false);
            }
          }
        } else if (offsetY >= 500 && isMobile == false) {
          navContainer.style.position = "fixed";
          if (navLogoContainer) {
            navLogoContainer.style.display = "block";
          }
        } else if (offsetY <= 5 && isMobile == false) {
          navContainer.style.position = "relative";
          if (navLogoContainer) {
            navLogoContainer.style.display = "none";
          }
        }
        if (offsetY < lastY) {
          //Scroll UP
          navContainer.style.opacity = "100%";
          navContainer.style.height = "13vh";
        } else {
          //Scroll DOWN
          navContainer.style.opacity = "70%";
          navContainer.style.height = "8vh";
        }
      }
    }

    window.addEventListener("scroll", checkOffsetY);
    return () => {
      isMounted = false;
      window.removeEventListener("scroll", checkOffsetY);
    };
  }, [offsetY]);
  //! ANY DEVICE - Transparent Navbar functionality - END

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
    width,
  };
};

export default NavbarLogic;
