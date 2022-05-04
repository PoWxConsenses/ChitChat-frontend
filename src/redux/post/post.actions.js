export const addPostImage = (postImage) => {
  return {
    type: "ADD_POST_IMAGE",
    payload: postImage,
  };
};
export const addPostVideo = (postVideo) => {
  return {
    type: "ADD_POST_VIDEO",
    payload: postVideo,
  };
};
export const changeVisibility = (visibility) => {
  return {
    type: "CHANGE_VISIBILITY",
    payload: visibility,
  };
};
export const changeTextContent = (textContent) => {
  return {
    type: "CHANGE_TEXT_CONTENT",
    payload: textContent,
  };
};

export const resetPost = () => {
  return {
    type: "RESET_POST",
  };
};
