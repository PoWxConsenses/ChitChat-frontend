const INITIAL_STATE = {
  textContent: "",
  visibility: "public",
  postImages: [],
  postVideos: [],
};

const PostReducer = (state = INITIAL_STATE, actions) => {
  switch (actions.type) {
    case "ADD_POST_IMAGE":
      return {
        ...state,
        postImages: [actions.payload, ...state.postImages],
      };
    case "ADD_POST_VIDEO":
      return {
        ...state,
        postVideos: [actions.payload, ...state.postVideos],
      };
    case "CHANGE_TEXT_CONTENT":
      return {
        ...state,
        textContent: actions.payload,
      };
    case "CHANGE_VISIBILITY":
      return {
        ...state,
        visibility: actions.payload,
      };
    case "RESET_POST":
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default PostReducer;
