import React from "react";

import "./PanelTab.css";
const PanelTab = ({ cName, bg, txtColor, isSoon, icon, text, spanText }) => {
  return (
    <div
      className={
        isSoon
          ? [`${cName} ${bg} ${txtColor} panel-tab soon`]
          : [`${cName} ${bg} ${txtColor} panel-tab`]
      }
    >
      <div>
        {icon}
        <p>{text}</p>
      </div>
      <span>{spanText}</span>
    </div>
  );
};

export default PanelTab;
