import React from "react";
import axios from "axios";
import { withRouter, Redirect } from "react-router-dom";
import "./create-story.style.scss";

class CreateStory extends React.Component {
  constructor() {
    super();
    this.state = {
      stillUploading: true,
      imageOrVideo: null,
      textContent: "",
      isImage: true,
      isTextContent: false,
    };
  }
  myFunction = () => {
    var reader = new FileReader();
    const { imageOrVideo, isImage } = this.state;
    const idx = imageOrVideo.type.startsWith("image") ? "image" : "video";
    if (idx === "video" && isImage) this.setState({ isImage: false });
    reader.onload = function (e) {
      const src = reader.result;
      const pre = document.getElementById(`mediaContent-${idx}`);
      pre.src = src;
    };
    if (imageOrVideo) reader.readAsDataURL(imageOrVideo);
  };
  shareStory = async () => {
    const { textContent, imageOrVideo } = this.state;
    if (!textContent && !imageOrVideo) return;
    const newForm = new FormData();
    newForm.append("imgOrVideo", imageOrVideo);
    newForm.append("textContent", textContent);
    newForm.append("visibility", "public");
    try {
      const API = process.env.REACT_APP_BACKEND_URL;
      const response = await axios({
        method: "POST",
        url: `${API}/api/story`,
        data: newForm,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        },
      });
      if (response.status === 200) {
        this.props.history.push("/");
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  render() {
    const { stillUploading, imageOrVideo, isImage, isTextContent } = this.state;
    return (
      <div className="create-story-page">
        <div className="story-preview">
          <div className="preview-box">
            {stillUploading ? (
              <div className="bind-upload">
                <label
                  for="mediaContent"
                  className="upload-card img-video-upload"
                >
                  Create a Media Story
                </label>
                <input
                  type="file"
                  accept="image/*,video/*"
                  id="mediaContent"
                  name="mediaContent"
                  onChange={(event) => {
                    this.setState({
                      imageOrVideo: event.target.files[0],
                      stillUploading: false,
                    });
                  }}
                  hidden
                />
                <div
                  className="upload-card text-upload"
                  onClick={() =>
                    this.setState({
                      isTextContent: true,
                      stillUploading: false,
                    })
                  }
                >
                  Text Content
                </div>
              </div>
            ) : null}
            {!stillUploading ? (
              <div className="preview-upoaded-mediaContent">
                {imageOrVideo && isImage ? (
                  <img
                    alt="image not found"
                    id="mediaContent-image"
                    height="100%"
                    width="100%"
                  />
                ) : null}
                {imageOrVideo && !isImage ? (
                  <video
                    alt="video not found"
                    id="mediaContent-video"
                    height="100%"
                    width="100%"
                  ></video>
                ) : null}
                {isTextContent ? (
                  <div
                    className="story-textcontent-box"
                    contentEditable
                    onInput={(event) =>
                      this.setState({ textContent: event.target.textContent })
                    }
                  ></div>
                ) : null}
              </div>
            ) : null}
            {imageOrVideo ? this.myFunction() : null}
          </div>
        </div>
        <div className="story-settings">
          <div className="settings-body">
            <div className="setting-footer">
              <button onClick={() => this.props.history.goBack()}>
                Discard
              </button>
              <button onClick={this.shareStory}>Share to story</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(CreateStory);
