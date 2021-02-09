import React from "react";
import Media from "../Media";
import "./Card.css";
import phone from "../../../assets/svgs/phone-square-alt-solid.svg";
import fb from "../../../assets/svgs/facebook-square-brands.svg";
import twitter from "../../../assets/svgs/twitter-square-brands.svg";

const Card = () => {
  return (
    <div className="media-card">
      <main>
        <Media
          mediaClass="phone"
          mediaIcon={phone}
          mediaText={`Smart - 0920 679 6099\nGlobe - 0915 117 1197`}
        />
        <Media
          mediaClass="fb"
          mediaIcon={fb}
          mediaText="facebook.com/nenetelecom"
          isLink={true}
        />
        <Media
          mediaClass="twitter"
          mediaIcon={twitter}
          mediaText="twitter.com/nenetelecom"
          isLink={true}
        />
      </main>
    </div>
  );
};

export default Card;
