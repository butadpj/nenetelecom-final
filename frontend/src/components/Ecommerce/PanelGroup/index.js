import React from "react";

import "./PanelGroup.css";

const PanelGroup = (props) => {
  return <div className="panel-group">{props.children}</div>;
};

export default PanelGroup;
