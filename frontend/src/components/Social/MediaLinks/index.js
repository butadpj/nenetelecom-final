import React from "react";
import "./MediaLinks.css";

const Media = ({ mediaIcon, mediaText, mediaLink }) => {
  return (
    <div className="media">
      <a href={mediaLink} target="_blank">
        <img
          className="media-icon"
          src={mediaIcon}
          alt="Social Media"
          width="35"
        />
      </a>

      <div className="media-text">
        <a
          style={{ textDecoration: "none", color: "var(--dark)" }}
          href={mediaLink}
          target="_blank"
        >
          {mediaText}
        </a>
      </div>
    </div>
  );
};

export default Media;
