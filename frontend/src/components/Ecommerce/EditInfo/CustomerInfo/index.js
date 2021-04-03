import React from "react";
import "./CustomerInfo.css";
import CustomerInfoLogic from "./CustomerInfoLogic";
import Button from "../../../Button";
import Alert from "../../../../components/Ecommerce/Alert";

const CustomerInfo = () => {
  const {
    customerFirstName,
    customerLastName,
    customerMobileNumber,
    customerCompleteAddress,
    isEditing,
    showSaveButton,
    hideSaveButton,
    saveNewCustomerInfo,
    showAlert,
    alertInfo,
  } = CustomerInfoLogic();

  return (
    <section className="customer-info">
      <h5 className="section-text">Customer Info</h5>
      <div className="info">
        <div className="first-name">
          <span className="label">First name: </span>
          <span className="value" name="firstName">
            {customerFirstName}
          </span>
        </div>
        <div className="last-name">
          <span className="label">Last name: </span>
          <span className="value" name="lastName">
            {customerLastName}
          </span>
        </div>
        <div className="mobile-number">
          <span className="label">Mobile number: </span>
          <span className="value" name="mobileNumber">
            {customerMobileNumber}
          </span>
        </div>
        {/* <div className="complete-address">
          <span className="label">Complete address: </span>
          {!customerCompleteAddress ? (
            <span className="null-message value">
              Specify your address for faster transaction
            </span>
          ) : (
            <span className="value">{customerCompleteAddress}</span>
          )}
        </div> */}
      </div>

      {isEditing ? (
        <>
          <div className="edit-action">
            <Button text="Cancel" functionality={hideSaveButton} />
            <Button text="Save" functionality={saveNewCustomerInfo} />
          </div>
        </>
      ) : null}

      {!isEditing ? (
        <Button
          text={
            <>
              <span>edit customer info</span>
              <i className="fas fa-pencil-alt"></i>
            </>
          }
          functionality={showSaveButton}
        />
      ) : null}
      {showAlert ? (
        <Alert
          position={alertInfo.position}
          status={alertInfo.status}
          text={alertInfo.text}
        />
      ) : null}
    </section>
  );
};

export default CustomerInfo;
