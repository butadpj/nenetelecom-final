import React from "react";
import "./Alert.css";
const Alert = ({ position, status, text }) => {
  return (
    <main className={`modal-alert modal-alert-${position} ${status}`}>
      <h5>{text}</h5>
      {status === "success" ? (
        <i className="fas fa-check-circle"></i>
      ) : (
        <i className="fas fa-times-circle"></i>
      )}
    </main>
  );
};

export default Alert;
