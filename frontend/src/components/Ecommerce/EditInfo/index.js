import React from "react";

import "./EditInfo.css";
import ModalWrapper from "../../../components/Ecommerce/ModalWrapper";
import closeIconRed from "../../../assets/svgs/close.svg";
import DisplayPicture from "./DisplayPicture";
import CustomerInfo from "./CustomerInfo";

const EditInfo = (props) => {
  return (
    <ModalWrapper>
      <main className="edit-info-modal modal-content">
        <h5 className="modal-title">Edit Profile</h5>
        <hr />
        <DisplayPicture />
        <CustomerInfo />
        <div className="modal-close-button">
          <img
            src={closeIconRed}
            alt="close-red"
            onClick={props.handleCloseEditInfoModal}
          />
        </div>
      </main>
    </ModalWrapper>
  );
};

export default EditInfo;
