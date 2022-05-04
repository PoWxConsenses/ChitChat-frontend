import React from "react";
import { connect } from "react-redux";
import FileUpload from "../../../components/upload-file-window/upload-file-window.component";
import { BiImageAdd } from "react-icons/bi";
import "./profile-header.style.scss";
import { toggleFileUploadWindow } from "./../../../redux/toggle/toggle.actions";
import Avatar from "./../../../components/avatar/avatar.component";
import axios from "axios";
const API = process.env.REACT_APP_BACKEND_URL;

class ProfileHeader extends React.Component {
  constructor() {
    super();
    this.state = {
      doUserFollow: false,
      isUserFriend: false,
      forName: [],
    };
  }
  followOrUnfollowUser = async () => {
    const whichMethod = this.state.doUserFollow ? "PATCH" : "POST";
    try {
      const API = process.env.REACT_APP_BACKEND_URL;
      const response = await axios({
        method: whichMethod,
        url: `${API}/api/follow/${this.props.user._id}`,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        },
      });
      if (response.status === 200) {
        this.setState({ doUserFollow: response.data.isFollowing });
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  componentDidMount() {
    axios({
      method: "GET",
      url: `${API}/api/follow/${this.props.user._id}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
      },
    })
      .then((res) => this.setState({ doUserFollow: res.data.doUserFollow }))
      .catch((err) => console.log(err.message));
  }
  render() {
    const { user, currentUser } = this.props;
    return (
      <div className="profile-top-body">
        <div
          className="top-body-inner"
          style={{
            backgroundImage: `url(${API}/api/public/user/coverPhoto/${user.coverPhoto})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="profile-user-options">
            <div className="profile-photo-container">
              <Avatar
                height="100%"
                width="100%"
                userImg={`${API}/api/public/user/profilePhoto/${user.profilePhoto}`}
              />
              {user._id === currentUser._id ? (
                <div
                  className="upload-profile-img"
                  onClick={() => {
                    this.setState({ forName: ["profilePhoto"] });
                    this.props.toggleFileUploadWindow(true);
                  }}
                >
                  <BiImageAdd />
                </div>
              ) : null}
            </div>
            <div className="connect-request select-disable">
              {user.canUserFollowYou && user._id != currentUser._id ? (
                <div className="connect">
                  {this.state.isUserFriend ? "Friend" : "Friend Request"}
                </div>
              ) : null}
              {user.canUserRequestForFriendShip &&
              user._id != currentUser._id ? (
                <div className="follow" onClick={this.followOrUnfollowUser}>
                  {this.state.doUserFollow ? "Following" : "Follow"}
                </div>
              ) : null}
            </div>
          </div>
          {user._id === currentUser._id ? (
            <div
              className="cover-photo-upload"
              onClick={() => {
                this.setState({ forName: ["coverPhoto"] });
                this.props.toggleFileUploadWindow(true);
              }}
            >
              Add Cover Photo
            </div>
          ) : null}
        </div>
        <div className="user-detail-top-body">
          <div className="user-boi-detail">
            <div className="profile-user-name">
              {user.firstName + " " + user.lastName}
            </div>
            <div className="profile-user-title">{user.about}</div>
          </div>
        </div>
        {this.props.isFileUploadOpen ? (
          <FileUpload
            uploadMethod="PATCH"
            uploadURL={`${API}/api/user/`}
            forName={this.state.forName}
          />
        ) : null}
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
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProfileHeader);
