import React from "react";
import axios from "axios";
import autosize from "autosize";
import { connect } from "react-redux";
import {
  addPostImage,
  addPostVideo,
  changeVisibility,
  changeTextContent,
  resetPost,
} from "../../redux/post/post.actions";

import "./post-model-window.style.scss";
import { togglePostModelWindow } from "../../redux/toggle/toggle.actions";
import Avatar from "../avatar/avatar.component";
import { IoCloseSharp } from "react-icons/io5";
import { BsFillCameraVideoFill, BsFillImageFill } from "react-icons/bs";

const handleClick = (event, togglePostModelWindow) => {
  let actions = event.target.className.baseVal;
  if (!actions) actions = event.target.className;
  switch (actions) {
    case "close-this":
    case "close-post-model-window": {
      togglePostModelWindow(false);
      return;
    }
    case "post-model-window": {
      togglePostModelWindow(false);
      return;
    }
    default:
      return;
  }
};
const API = process.env.REACT_APP_BACKEND_URL;

class PostModelWindow extends React.Component {
  constructor() {
    super();
    this.fileReader = new FileReader();
  }
  componentDidMount() {
    this.textarea.focus();
    autosize(this.textarea);
  }
  handlePostClick = async (event) => {
    const { textContent, visibility, postImages, postVideos } = this.props;
    const form = new FormData();
    form.append("textContent", textContent);
    form.append("visibility", visibility);
    postImages.map((postImage) => form.append("postImages", postImage));
    postVideos.map((postVideo) => form.append("postVideos", postVideo));
    try {
      const response = await axios({
        method: "POST",
        url: `${API}/api/post`,
        data: form,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        },
      });
      if (response.status == 200) {
        console.log(response.data);
        resetPost();
        document.querySelector(".close-post-model-window").click();
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  myFunction = (file, idx) => {
    var reader = new FileReader();

    reader.onload = function (e) {
      const src = reader.result;
      const pre = document.getElementById(`mediaContent-${idx}`);
      pre.src = src;
    };
    console.log(file);
    if (file) reader.readAsDataURL(file);
  };
  handleKeyDown(e) {
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
    // In case you have a limitation
    // e.target.style.height = `${Math.min(e.target.scrollHeight, limit)}px`;
  }
  render() {
    const {
      togglePostModelWindow,
      addPostImage,
      addPostVideo,
      changeTextContent,
      resetPost,
      changeVisibility,
    } = this.props;
    const { textContent, visibility, postImages, postVideos, user } =
      this.props;
    return (
      <div
        className="post-model-window"
        onClick={(event) => handleClick(event, togglePostModelWindow)}
      >
        <div className="post-model-form">
          <div className="post-model-header">
            <Avatar
              height="60px"
              width="60px"
              userImg={`${API}/api/public/user/profilePhoto/${user.profilePhoto}`}
            />
            <div className="author-and-visiblity">
              <span className="post-author-name">
                {user.firstName + " " + user.lastName}
              </span>
              <span className="post-visibility">
                <select
                  name="visibility"
                  className="visibility"
                  onChange={(event) => changeVisibility(event.target.value)}
                >
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                  <option value="follower">Friends + Followers</option>
                  <option value="friends">Friends Only</option>
                </select>
              </span>
            </div>
            <span onClick={() => resetPost()}>Reset</span>
            <span
              className="close-post-model-window"
              onClick={(event) => handleClick(event, togglePostModelWindow)}
            >
              <IoCloseSharp className="close-this" />
            </span>
          </div>

          <div className="post-model-center">
            <div className="post-model-textContent">
              <textarea
                className="grow-textContent"
                ref={(c) => (this.textarea = c)}
                placeholder="What in your mind?"
                rows={1}
                defaultValue=""
                onChange={(event) => changeTextContent(event.target.value)}
              />
            </div>
            <div className="post-model-mediaContent">
              {postImages
                ? postImages.map((media, idx) => (
                    <div className="mediaContent">
                      <img
                        id={`mediaContent-${idx}`}
                        className="content"
                        src="https://bit.ly/3yTW8pL"
                        alt=""
                      />
                    </div>
                  ))
                : null}
              {postImages
                ? postImages.map((media, idx) => this.myFunction(media, idx))
                : null}
            </div>
          </div>

          <div className="post-model-bottom">
            <input
              type="file"
              accept="image/*"
              id="imageContent"
              name="imageContent"
              onChange={(event) => addPostImage(event.target.files[0])}
              multiple
              hidden
            />
            <label for="imageContent">
              <BsFillImageFill className="post-options" />
            </label>
            <input
              type="file"
              accept="video/mp4,video/x-m4v,video/*"
              id="videoContent"
              name="videoContent"
              onChange={(event) => addPostVideo(event.target.files[0])}
              multiple
              hidden
            />
            <label for="videoContent">
              <BsFillCameraVideoFill className="post-options" />
            </label>
            <div
              className="post-btn"
              onClick={async () => await this.handlePostClick()}
            >
              Post
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    togglePostModelWindow: (isOpen) => dispatch(togglePostModelWindow(isOpen)),
    addPostImage: (postImage) => dispatch(addPostImage(postImage)),
    addPostVideo: (postVideo) => dispatch(addPostVideo(postVideo)),
    changeVisibility: (visibility) => dispatch(changeVisibility(visibility)),
    changeTextContent: (textContent) =>
      dispatch(changeTextContent(textContent)),
    resetPost: () => dispatch(resetPost()),
  };
};
const mapStateToProps = (state) => {
  return {
    postImages: state.Post.postImages,
    textContent: state.Post.textContent,
    visibility: state.Post.visibility,
    postVideos: state.Post.postVideos,
    user: state.user.currentUser,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PostModelWindow);
