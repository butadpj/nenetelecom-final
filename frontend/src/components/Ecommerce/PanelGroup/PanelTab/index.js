import React from "react";

import "./PanelTab.css";
const PanelTab = ({ cName, isSoon, icon, text, spanText }) => {
  return (
    <div
      className={isSoon ? [cName + " soon panel-tab"] : [cName + " panel-tab"]}
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
