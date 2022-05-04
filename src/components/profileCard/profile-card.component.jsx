import React from "react";
import { Link } from "react-router-dom";
import { sendFriendRequest } from "../../utils/postRequest";
import "./profile-card.style.scss";
import Avatar from "./../avatar/avatar.component";
import Loader from "react-loader-spinner";
const API = process.env.REACT_APP_BACKEND_URL;

class ProfileCard extends React.Component {
  constructor() {
    super();
    this.state = {
      messsage: "",
      isSending: false,
      isSent: false,
      canConnect: true,
    };
  }
  handleConnectClick = async () => {
    if (this.state.isSent) return;
    this.setState({ isSending: true, isSent: false, canConnect: false });
    if (
      await sendFriendRequest({
        userId: this.props.userId,
        message: this.state.message,
      })
    ) {
      this.setState({ isSending: false, isSent: true, canConnect: false });
    } else {
      this.setState({ isSending: false, isSent: false, canConnect: true });
    }
  };
  render() {
    const {
      userPhoto,
      coverPhoto,
      userOrg,
      mutual,
      userName,
      profileLink,
      userId,
    } = this.props;
    const { isSending, isSent, canConnect } = this.state;
    return (
      <div className="inner-profile-card">
        <div
          className="cover-photo"
          style={{
            backgroundImage: `url(${API}/api/public/user/coverPhoto/${coverPhoto})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
        <div className="user-photo-container">
          <Avatar
            height="90px"
            width="90px"
            userImg={`${API}/api/public/user/profilePhoto/${userPhoto}`}
          />
        </div>
        <Link to={`/profile/${profileLink}`} className="userName">
          {userName}
        </Link>
        <div className="user-org">{userOrg}</div>
        <div className="mutuals"># {mutual} mutual friends</div>
        <button
          className="connect"
          onClick={async () => await this.handleConnectClick()}
        >
          {!isSending && !isSent ? (
            "Connect"
          ) : isSending ? (
            <Loader type="Puff" color="#00BFFF" height={30} width={30} />
          ) : (
            "Sent"
          )}
        </button>
      </div>
    );
  }
}
export default ProfileCard;
