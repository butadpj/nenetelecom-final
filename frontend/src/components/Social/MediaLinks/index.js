import React from "react";
import "./MediaLinks.css";

const Media = ({ mediaIcon, mediaText, isLink }) => {
  return (
    <div className="media">
      <img className="media-icon" src={mediaIcon} alt="Social Media" />
      <div className="media-text">
        {isLink ? (
          <a
            style={{ textDecoration: "none", color: "var(--dark)" }}
            href={["https://" + mediaText]}
            target="_blank"
          >
            {mediaText}
          </a>
        ) : (
          mediaText
        )}
      </div>
    </div>
  );
};

export default Media;
