import React, { useState, useContext, useRef } from "react";
import { CustomerInfoContext } from "../../../../context/CustomerInfoContext";
import GetCurrentCustomer from "../../../../hooks/GetCurrentCustomer";
import { useHandleShowAlert } from "../../../../hooks/useHandleShowAlert";

const DisplayPictureLogic = () => {
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
  const handleCloseImagePreviewModal = () => {
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
        handleCloseImagePreviewModal();
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

  return {
    customerDisplayPicture,
    selectedImageHandler,
    handleShowImagePreviewModal,
    showImagePreviewModal,
    imagePreviewModal,
    uploadImage,
    handleCloseImagePreviewModal,
    uploadNewImage,
    showAlert,
    alertInfo,
    isLoading,
  };
};

export default DisplayPictureLogic;
