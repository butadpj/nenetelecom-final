import React, { useRef, useEffect } from "react";
import "./NavLight.css";
import NavbarLogic from "./NavbarLogic";

const Navbar = ({ navLogoContainer, navListContainer }) => {
  const navContainer = useRef(null);
  console.log(navLogoContainer);

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
  } = NavbarLogic();

  //* MOBILE SCREEN - Navbar hover functionality - START

  useEffect(() => {
    navContainer.current.addEventListener("mouseover", () =>
      navDarkApply(navContainer)
    );
    return () => {
      navContainer.current.removeEventListener("mouseover", () =>
        navDarkApply(navContainer)
      );
    };
  });

  useEffect(() => {
    navContainer.current.addEventListener("mouseleave", () =>
      navLightApply(navContainer, navListContainer.ref.current)
    );
    return () => {
      navContainer.current.removeEventListener("mouseleave", () =>
        navLightApply(navContainer, navListContainer.ref.current)
      );
    };
  });

  //* MOBILE SCREEN - Navbar hover functionality - END

  //* ANY DEVICE - Transparent Navbar functionality - START

  useEffect(() => {
    window.addEventListener("scroll", checkOffsetY);
    return () => {
      window.removeEventListener("scroll", checkOffsetY);
    };
  });

  useEffect(() => {
    if (navLogoContainer.ref.current != null) {
      handleResize();
      if (isMobile == true) {
        navLogoContainer.ref.current.style.display = "block";
      }
    }
  });

  useEffect(() => {
    if (navContainer.current != null) {
      if (offsetY >= 500 && isMobile == true) {
        navContainer.current.style.position = "fixed";
        navContainer.current.style.opacity = "100%";
        navContainer.current.classList.add("nav-bottom");
        navContainer.current.classList.remove("nav-fade-in");

        setIsDark(true);
      } else if (offsetY <= 5 && isMobile == true) {
        if (isDark == true) {
          if (offsetY <= 5) {
            navContainer.current.style.position = "relative";
            navContainer.current.style.opacity = "70%";
            navContainer.current.classList.remove("nav-bottom");
            navContainer.current.classList.add("nav-fade-in");

            setIsDark(false);
          }
        }
      } else if (offsetY >= 500 && isMobile == false) {
        navContainer.current.style.position = "fixed";
        navContainer.current.style.opacity = "100%";
        if (navLogoContainer.ref.current != null) {
          navLogoContainer.ref.current.style.display = "block";
        }
      } else if (offsetY <= 5 && isMobile == false) {
        navContainer.current.style.position = "absolute";
        navContainer.current.style.opacity = "70%";
        if (navLogoContainer.ref.current != null) {
          navLogoContainer.ref.current.style.display = "none";
        }
      }
      if (offsetY > lastY) {
        //Scroll Down
        navContainer.current.style.opacity = "70%";
      } else {
        //Scroll UP
        navContainer.current.style.opacity = "100%";
      }
    }
  }, [offsetY]);

  //* ANY DEVICE - Transparent Navbar functionality - END

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
