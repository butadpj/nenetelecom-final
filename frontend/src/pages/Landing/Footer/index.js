import React from "react";
import "./Footer.css";

import logo from "../../../assets/images/full-word-dark-bg.webp";
const Footer = () => {
  return (
    <section className="footer">
      <img src={logo} alt="logo" className="logo" />
      <div className="info-text">
        <main>
          <div className="call-us info-box">
            <h4>CALL US!</h4>
            <h5>{`Smart - 0920 679 6099\nGlobe - 0915 117 1197`}</h5>
          </div>
          <div className="visit-us info-box">
            <h4>COME & VISIT US!</h4>
            <h5>
              {`Greenhills Mall (2nd Floor),\nOrtigas Ave, San Juan 1502\nManila, Philippines`}
            </h5>
          </div>
        </main>
        <div className="copyright">
          <h5>
            © 2021, Nene Telecom <u>Terms of Service</u> , <u>Privacy Policy</u>
          </h5>
        </div>
      </div>
    </section>
  );
};

export default Footer;
