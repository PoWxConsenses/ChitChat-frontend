export const togglePostModelWindow = (isOpen) => {
  return {
    type: "TOGGLE_POST_MODEL_WINDOW",
    payload: isOpen,
  };
};

export const toggleHeaderProfileDropdown = () => {
  return {
    type: "TOGGLE_HEADER_PROFILE_DROPDOWN",
  };
};

export const toggleSignInAndSignUp = (isSignInForm) => {
  return {
    type: "TOGGLE_SIGNIN_SIGNUP_STATE",
    payload: isSignInForm,
  };
};

export const resetToggle = () => {
  return {
    type: "RESET_ALL_TOGGLE_WINDOW",
  };
};

export const toggleFileUploadWindow = (isFileUploadOpen) => {
  return {
    type: "TOGGLE_FILE_UPLOAD_WINDOW",
    payload: isFileUploadOpen,
  };
};
