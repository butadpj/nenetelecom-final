import React, { useState, useContext, useRef } from "react";
import "./DisplayPicture.css";
import guestImg from "../../../../assets/svgs/guest_user.svg";
import { CustomerInfoContext } from "../../../../context/CustomerInfoContext";
import GetCurrentCustomer from "../../../../hooks/GetCurrentCustomer";
import Button from "../../../../components/Button";
import { useHandleShowAlert } from "../../../../hooks/useHandleShowAlert";
import Alert from "../../../../components/Ecommerce/Alert";
import Loader from "../../../../components/Ecommerce/Loader";

const DisplayPicture = () => {
  const [state, dispatch] = useContext(CustomerInfoContext);
  const { djangoCurrentCustomerId } = GetCurrentCustomer();
  const { alertInfo, showAlert, handleShowAlert } = useHandleShowAlert();

  const [uploadImage, setUploadImage] = useState({
    file: null,
    src: null,
    name: null,
  });
  const [showImagePreviewModal, setShowImagePreviewModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  let customerDisplayPicture = state.customerInfo.displayPicture;
  let imagePreviewModal = useRef(null);

  const selectedImageHandler = (event) => {
    let imageFile = event.target.files[0];
    let fileUrl = URL.createObjectURL(imageFile);
    setUploadImage({
      ...uploadImage,
      file: imageFile,
      type: imageFile.type,
      src: fileUrl,
      name: imageFile.name,
    });
  };

  const handleShowImagePreviewModal = () => {
    setShowImagePreviewModal(true);
  };
  const hideImagePreviewModal = () => {
    setShowImagePreviewModal(false);
  };

  const uploadNewImage = () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("display_picture", uploadImage.file, uploadImage.name);

    fetch(`/api/customers/${djangoCurrentCustomerId}/`, {
      method: "PATCH",
      headers: {
        "X-CSRFToken": csrftoken,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        dispatch({
          type: "EDIT_DISPLAY_PICTURE",
          payload: {
            displayPicture: data.display_picture,
          },
        });
        handleShowAlert(
          "center",
          "success",
          "Display picture successfuly changed"
        );
        hideImagePreviewModal();
      })
      .catch((err) => {
        console.log(err);
        handleShowAlert(
          "center",
          "danger",
          "An error occured. Try to refresh the page"
        );
      });
  };

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
            <Button text="Cancel" functionality={hideImagePreviewModal} />
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
