import React from "react";

import "./ModalWrapper.css";
const ModalWrapper = (props) => {
  return <div className="modal-wrapper">{props.children}</div>;
};

export default ModalWrapper;
