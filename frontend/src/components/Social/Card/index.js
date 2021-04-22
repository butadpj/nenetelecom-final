import React from "react";
import Media from "../MediaLinks";
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
          mediaLink="https://facebook.com/nenetelecom"
          mediaText="facebook/nenetelecom"
        />
        <Media
          mediaClass="twitter"
          mediaIcon={twitter}
          mediaLink="https://twitter.com/nenetelecom"
          mediaText="twitter/nenetelecom"
        />
      </main>
    </div>
  );
};

export default Card;
