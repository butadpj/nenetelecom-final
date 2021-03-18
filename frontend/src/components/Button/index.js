import React from "react";
import "./Button.css";

const Button = ({ type, text, cName, functionality }) => {
  return (
    <button className={[cName + " btn"]} type={type} onClick={functionality}>
      {text}
    </button>
  );
};

export default Button;
