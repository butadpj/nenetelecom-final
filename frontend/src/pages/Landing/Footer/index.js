import React from "react";
import "./Footer.css";

import logo from "../../../assets/images/full-word-dark-bg.webp";
const Footer = () => {
  return (
    <section className="footer">
      <div className="info-text">
        <main>
          <div className="call-us info-box">
            <h4>CALL US!</h4>
            <p>{`Smart - 0920 679 6099\nGlobe - 0915 117 1197`}</p>
          </div>
          <div className="visit-us info-box">
            <h4>COME & VISIT US!</h4>
            <p>
              {`Greenhills Mall (2nd Floor),\nOrtigas Ave, San Juan 1502\nManila, Philippines`}
            </p>
          </div>
        </main>
        <img src={logo} alt="logo" className="logo" width="100" />
        <div className="copyright">
          <h4>
            © 2021, Nene Telecom <u>Terms of Service</u> , <u>Privacy Policy</u>
          </h4>
        </div>
      </div>
    </section>
  );
};

export default Footer;
