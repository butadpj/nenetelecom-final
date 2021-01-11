import React from "react";
import Media from "../Media";
import "./Card.css";
import gmail from "../../../assets/svgs/envelope-square-solid.svg";
import fb from "../../../assets/svgs/facebook-square-brands.svg";
import twitter from "../../../assets/svgs/twitter-square-brands.svg";

const Card = () => {
  return (
    <div className="media-card">
      <main>
        <Media
          mediaClass="gmail"
          mediaIconClass="gmail-icon"
          mediaTextClass="gmail-text"
          mediaIcon={gmail}
          mediaText="nenetelecom@gmail.com"
        />
        <Media
          mediaClass="fb"
          mediaIconClass="fb-icon"
          mediaTextClass="fb-text"
          mediaIcon={fb}
          mediaText="facebook.com/nenetelecom"
        />
        <Media
          mediaClass="twitter"
          mediaIconClass="twitter-icon"
          mediaTextClass="twitter-text"
          mediaIcon={twitter}
          mediaText="twitter.com/nenetelecom"
        />
      </main>
    </div>
  );
};

export default Card;
