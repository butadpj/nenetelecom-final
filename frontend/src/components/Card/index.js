import React from "react";
import "./Card.css";

const Card = ({ icon, title, text }) => {
  return (
    <main className="card">
      {icon && (
        <div className="card-icon">
          <img src={icon} alt="" />
        </div>
      )}

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
    </main>
  );
};

export default Card;
