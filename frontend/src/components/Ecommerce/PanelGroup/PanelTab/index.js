import React from "react";

import "./PanelTab.css";
const PanelTab = ({
  cName,
  bg,
  txtColor,
  isSoon,
  icon,
  text,
  spanText,
  functionality,
}) => {
  return (
    <div
      onClick={functionality ? () => functionality() : null}
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
