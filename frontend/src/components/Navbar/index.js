import React, { useRef, useEffect } from "react";
import "./Navbar.css";
import NavbarLogic from "./NavbarLogic";

const Navbar = ({ navLogoContainer, navListContainer }) => {
  const navContainer = useRef(null);

  const {
    navToggleIcon,
    navToggle,
    navDarkApply,
    navLightApply,
    checkOffsetY,
    handleResize,
    isMobile,
    lastY,
    offsetY,
    isDark,
    setIsDark,
    width,
  } = NavbarLogic();

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
      if (navContainer.current) {
        navContainer.current.addEventListener("mouseover", () =>
          navDarkApply(navContainer)
        );
      }

      if (navContainer.current) {
        navContainer.current.addEventListener("mouseleave", () =>
          navLightApply(navContainer, navListContainer.ref.current)
        );
      }

      if (navLogoContainer) {
        handleResize();
        if (isMobile == true) {
          navLogoContainer.ref.current.style.display = "block";
        }
      }
    }

    return () => {
      if (navContainer.current) {
        navContainer.current.removeEventListener("mouseover", () =>
          navDarkApply(navContainer)
        );
      }

      if (navContainer.current) {
        navContainer.current.removeEventListener("mouseleave", () =>
          navLightApply(navContainer, navListContainer.ref.current)
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
          navContainer.current.style.position = "fixed";
          navContainer.current.classList.add("nav-bottom");
          navContainer.current.classList.remove("nav-fade-in");

          setIsDark(true);
        } else if (offsetY <= 5 && isMobile == true) {
          if (isDark == true) {
            if (offsetY <= 5) {
              navContainer.current.style.position = "relative";
              navContainer.current.classList.remove("nav-bottom");
              navContainer.current.classList.add("nav-fade-in");
              navContainer.current.style.height = "13vh";

              setIsDark(false);
            }
          }
        } else if (offsetY >= 500 && isMobile == false) {
          navContainer.current.style.position = "fixed";
          if (navLogoContainer) {
            navLogoContainer.ref.current.style.display = "block";
          }
        } else if (offsetY <= 5 && isMobile == false) {
          navContainer.current.style.position = "relative";
          if (navLogoContainer) {
            navLogoContainer.ref.current.style.display = "none";
          }
        }
        if (offsetY < lastY) {
          //Scroll UP
          navContainer.current.style.opacity = "100%";
          navContainer.current.style.height = "13vh";
        } else {
          //Scroll DOWN
          navContainer.current.style.opacity = "70%";
          navContainer.current.style.height = "8vh";
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
