const INITIAL_STATE = {
  isPostModelWindowOpen: false,
  isHeaderProfileOpen: false,
  isSignInForm: true,
  isFileUploadOpen: false,
};

const toggle = (state = INITIAL_STATE, actions) => {
  switch (actions.type) {
    case "TOGGLE_POST_MODEL_WINDOW":
      return {
        ...state,
        isPostModelWindowOpen: actions.payload,
      };
    case "TOGGLE_HEADER_PROFILE_DROPDOWN":
      return {
        ...state,
        isHeaderProfileOpen: !state.isHeaderProfileOpen,
      };
    case "TOGGLE_SIGNIN_SIGNUP_STATE":
      return {
        ...state,
        isSignInForm: actions.payload,
      };
    case "TOGGLE_FILE_UPLOAD_WINDOW":
      return {
        ...state,
        isFileUploadOpen: actions.payload,
      };
    case "RESET_ALL_TOGGLE_WINDOW":
      return INITIAL_STATE;

    default:
      return state;
  }
};

export default toggle;
