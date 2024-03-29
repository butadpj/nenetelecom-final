import React, { useRef, useState } from "react";
import "./Home.css";
import logo from "../../../assets/images/full-word-light.webp";

//NAVBAR IMPORTS
import { Link } from "react-scroll";
import Navbar from "../../../components/Navbar/";
import navlogo from "../../../assets/svgs/Initials-light.svg";
import { animateScroll as scroll } from "react-scroll";

const Home = () => {
  const scrollToTop = () => {
    scroll.scrollToTop();
  };
  const navLogoContainer = useRef(null);
  const navListContainer = useRef(null);

  return (
    <section className="home" id="home">
      <Navbar
        navLogoContainer={
          <a className="nav-logo" ref={navLogoContainer} onClick={scrollToTop}>
            <img src={navlogo} alt="" />
          </a>
        }
        navListContainer={
          <div className="nav-list" ref={navListContainer}>
            <Link
              activeClass="active"
              to="store"
              spy={true}
              smooth={true}
              offset={0}
              duration={1500}
              className="list-item"
            >
              SHOP ONLINE
            </Link>

            <Link
              activeClass="active"
              to="visit"
              spy={true}
              smooth={true}
              offset={50}
              duration={1500}
              className="list-item"
            >
              VISIT US
            </Link>

            <Link
              activeClass="active"
              to="about"
              spy={true}
              smooth={true}
              offset={50}
              duration={1500}
              className="list-item"
            >
              ABOUT US
            </Link>

            <Link
              activeClass="active"
              to="contact"
              spy={true}
              smooth={true}
              offset={70}
              duration={1500}
              className="list-item"
            >
              CONTACT US
            </Link>
          </div>
        }
      />

      <img className="home-logo" src={logo} alt="Nene Telecom" />
      {/* <div style={{ textAlign: "center" }}>
        <h2>
          {width} x {height}
        </h2>
      </div> */}

      <div className="tagline">
        <p>A tradition of trust since 2010.</p>
      </div>
    </section>
  );
};

export default Home;
