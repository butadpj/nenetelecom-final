export const reducer = (state, action) => {
  if (action.type === "EDIT_CUSTOMER_INFO") {
    let newFirstName = action.payload.firstName;
    let newLastName = action.payload.lastName;
    let newFullName = action.payload.fullName;
    let newMobileNumber = action.payload.mobileNumber;
    return {
      ...state,
      customerInfo: {
        ...state.customerInfo,
        firstName: newFirstName,
        lastName: newLastName,
        fullName: newFullName,
        mobileNumber: newMobileNumber,
      },
    };
  }

  if (action.type === "EDIT_DISPLAY_PICTURE") {
    let newDisplayPicture = action.payload.displayPicture;

    return {
      ...state,
      customerInfo: {
        ...state.customerInfo,
        displayPicture: newDisplayPicture,
      },
    };
  }
};
