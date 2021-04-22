import React from "react";
import "./Card.css";

const Card = ({ icon, title, text }) => {
  return (
    <main className="card">
      {icon && (
        <div className="card-icon">
          <img src={icon} alt="" width="80" />
        </div>
      )}

      <div className="card-info">
        {title && (
          <div className="card-titlee">
            <p>{title}</p>
          </div>
        )}

        {text && (
          <div className="card-text">
            <p>{text}</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default Card;
