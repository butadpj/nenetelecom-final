import React from "react";

import "./HelpText.css";
const HelpText = ({ text, icon }) => {
  return (
    <main className="help-text">
      <span>{text}</span>
      {icon}
    </main>
  );
};

export default HelpText;
