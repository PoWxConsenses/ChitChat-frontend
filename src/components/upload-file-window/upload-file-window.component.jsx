import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import { IoCloseSharp } from "react-icons/io5";
import { setCurrentUser } from "./../../redux/user/user.actions";
import { toggleFileUploadWindow } from "./../../redux/toggle/toggle.actions";
import "./upload-file-window.style.scss";

class FileUpload extends React.Component {
  constructor() {
    super();
    this.state = {
      files: [],
    };
  }
  myFunction = (file, idx) => {
    var reader = new FileReader();

    reader.onload = function (e) {
      const src = reader.result;
      const pre = document.getElementById(`file-${idx}`);
      pre.src = src;
    };
    if (file) reader.readAsDataURL(file);
  };
  uploadFiles = async () => {
    const { uploadURL, uploadMethod, uploadFormData, forName } = this.props;
    let formData = new FormData();
    if (uploadFormData);
    else;
    forName.map((forThis, idx) =>
      formData.append(forThis, this.state.files[idx])
    );
    try {
      const response = await axios({
        method: uploadMethod,
        url: uploadURL,
        data: formData,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        },
      });
      if (response.status === 200) {
        // this.props.setCurrentUser(response.data.user);
        this.props.toggleFileUploadWindow(false);
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  closeFileWindow = () => {
    this.props.toggleFileUploadWindow(false);
  };
  render() {
    const { files } = this.state;
    return (
      <div
        className="file-upload-window"
        onClick={(event) =>
          event.target.className === "file-upload-window"
            ? this.closeFileWindow()
            : null
        }
      >
        <div className="inner-window">
          <div className="window-header">
            <div className="upload-file-text">Upload file</div>
            <div
              className="close-upload-file-window"
              onClick={this.closeFileWindow}
            >
              <IoCloseSharp />
            </div>
          </div>
          <div className="window-center">
            {files.length ? (
              <div className="uploaded-files">
                {files.map((file, idx) => (
                  <img src="" id={`file-${idx}`} />
                ))}
                {files.map((file, idx) => this.myFunction(file, idx))}
              </div>
            ) : (
              <div className="file-upload-input">
                <label htmlFor="upload-file" className="upload-file">
                  Upload file
                </label>
                <input
                  type="file"
                  accept="image/*"
                  name="upload-file"
                  id="upload-file"
                  onChange={(event) =>
                    this.setState({
                      files: [...this.state.files, event.target.files[0]],
                    })
                  }
                  hidden
                />
              </div>
            )}
          </div>
          <div className="window-footer">
            <div className="upload-btn" onClick={this.uploadFiles}>
              Upload
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser,
    isFileUploadOpen: state.toggle.isFileUploadOpen,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    toggleFileUploadWindow: (isFileUploadOpen) =>
      dispatch(toggleFileUploadWindow(isFileUploadOpen)),
    setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(FileUpload);
