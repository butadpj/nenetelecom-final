import React from "react";
import "./Button.css";

const Button = ({ type, text, cName }) => {
  return (
    <button className={[cName + " btn"]} type={type}>
      {text}
    </button>
  );
};

export default Button;
