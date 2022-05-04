import React from "react";
import { BsThreeDots } from "react-icons/bs";
import { socket } from "./../../../../service/socket";

import Avatar from "../../../avatar/avatar.component";
import { withRouter } from "react-router-dom";
import "./header.style.scss";
import { connect } from "react-redux";
const API = process.env.REACT_APP_BACKEND_URL;
class ChatInterfaceHeader extends React.Component {
  constructor() {
    super();
    this.state = {
      userStatus: "",
    };
  }
  typingStatusFromServer = (payload) => {
    if (payload.emittedFromUserId === this.props.friend._id) {
      this.setState({ userStatus: payload.userStatus });
    }
  };
  isUserOnlineFromServer = (payload) => {
    this.setState({ userStatus: payload.isUserOnline ? "Online" : "" });
  };
  componentDidMount() {
    setInterval(() => {
      socket.emit("isUserOnlineFromClient", {
        emittedFromRoomId: this.props.user.roomId,
        emittedToRoomId: this.props.friend.roomId,
        emittedFromUserId: this.props.user._id,
        emittedToUserId: this.props.friend._id,
      });
    }, 5000);
    socket.on("typingStatusFromServer", this.typingStatusFromServer);
    socket.on("isUserOnlineFromServer", this.isUserOnlineFromServer);
  }
  componentWillUnmount() {
    socket.off("typingStatusFromServer", this.typingStatusFromServer);
    socket.off("isUserOnlineFromServer", this.isUserOnlineFromServer);
  }
  render() {
    const { friend } = this.props;
    return (
      <div className="chat-interface-header">
        <Avatar
          height="50px"
          width="50px"
          userImg={`${API}/api/public/user/profilePhoto/${friend.profilePhoto}`}
        />
        <div className="chat-right-header-attr">
          <div
            className="chat-right-friend-username"
            onClick={() =>
              friend && friend.userName
                ? this.props.history.push(`/profile/${friend.userName}`)
                : null
            }
          >
            {friend ? friend.firstName + " " + friend.lastName : "not none"}
          </div>
          <div
            className="chat-right-friend-status"
            style={{
              display: `${this.state.userStatus ? "block" : "none"}`,
            }}
          >
            {this.state.userStatus}
          </div>
        </div>
        <div className="chat-right-end">
          <BsThreeDots className="three-dot" />
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user.currentUser,
    friend: state.Chat.friend,
  };
};

export default withRouter(connect(mapStateToProps)(ChatInterfaceHeader));
