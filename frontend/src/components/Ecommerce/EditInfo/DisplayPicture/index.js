import React from "react";

import "./DisplayPicture.css";
import DisplayPictureLogic from "./DisplayPictureLogic";
import guestImg from "../../../../assets/svgs/guest_user.svg";
import Button from "../../../../components/Button";
import Alert from "../../../../components/Ecommerce/Alert";
import Loader from "../../../../components/Ecommerce/Loader";

const DisplayPicture = () => {
  const {
    customerDisplayPicture,
    selectedImageHandler,
    handleShowImagePreviewModal,
    handleCloseImagePreviewModal,
    showImagePreviewModal,
    imagePreviewModal,
    uploadImage,
    uploadNewImage,
    showAlert,
    alertInfo,
    isLoading,
  } = DisplayPictureLogic();

  return (
    <>
      <section className="display-picture">
        <h5 className="section-text">Display Picture</h5>
        <img
          src={!customerDisplayPicture ? guestImg : customerDisplayPicture}
          alt="profile-img"
          width="70"
          height="70"
        />
        <label className="custom-file-upload">
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={selectedImageHandler}
            onClick={handleShowImagePreviewModal}
          />
          <span>Upload new pic</span> <i className="fas fa-plus"></i>
        </label>
      </section>
      {showImagePreviewModal ? (
        <main className="upload-preview modal-content" ref={imagePreviewModal}>
          <img
            className="preview-image"
            src={!uploadImage.src ? customerDisplayPicture : uploadImage.src}
            alt="preview-image"
            width="100"
            height="100"
          />
          <h6 className="name">{uploadImage.name}</h6>
          <div className="upload-action">
            <Button
              text="Cancel"
              functionality={handleCloseImagePreviewModal}
            />
            <Button text="Save" functionality={uploadNewImage} />
          </div>
        </main>
      ) : null}
      {showAlert ? (
        <Alert
          position={alertInfo.position}
          status={alertInfo.status}
          text={alertInfo.text}
        />
      ) : null}
      {isLoading ? <Loader /> : null}
    </>
  );
};

export default DisplayPicture;
