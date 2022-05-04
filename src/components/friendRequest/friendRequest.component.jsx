import React from "react";
import { connect } from "react-redux";
import "./friendRequest.style.scss";
import Avatar from "../avatar/avatar.component";
import { deleteFriendRequest } from "./../../redux/friend/friend.actions";

import {
  acceptFriendRequest,
  ignoreFriendRequest,
} from "./../../utils/deleteRequest";

class FriendRequest extends React.Component {
  constructor() {
    super();
  }
  handleAcceptClick = async (_id) => {
    if (await acceptFriendRequest(_id)) {
      this.props.deleteFriendRequest(_id);
    }
  };
  handleIgnoreClick = async (_id) => {
    if (await ignoreFriendRequest(_id)) {
      this.props.deleteFriendRequest(_id);
    }
  };
  render() {
    const { sentBy } = this.props.friend;
    const { firstName, lastName, _id } = sentBy;
    return (
      <div className="friend-request">
        <div className="user-img-container">
          <Avatar height="100%" width="100%" userImg="https://bit.ly/3yTW8pL" />
        </div>
        <div className="center">
          <div className="requester-name">{firstName + " " + lastName}</div>
          <div className="about-requester">He is love something</div>
        </div>
        <div className="end-options">
          <div
            className="accept-btn ai-btn"
            onClick={async () => await this.handleAcceptClick(_id)}
          >
            Accept
          </div>
          <div
            className="ignore-btn ai-btn"
            onClick={async () => await this.handleIgnoreClick(_id)}
          >
            Ignore
          </div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    deleteFriendRequest: (requesterId) =>
      dispatch(deleteFriendRequest(requesterId)),
  };
};

export default connect(null, mapDispatchToProps)(FriendRequest);
