import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import FriendRequest from "../friendRequest/friendRequest.component";
import { setFriendRequest } from "./../../redux/friend/friend.actions";
import "./friendConnect.style.scss";

class FriendConnect extends React.Component {
  constructor() {
    super();
  }
  componentDidMount() {
    const API = process.env.REACT_APP_BACKEND_URL;
    axios({
      method: "GET",
      url: `${API}/api/connect`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
      },
    })
      .then((response) => {
        this.props.setFriendRequestList(response.data.requests);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  render() {
    const { FriendRequestList } = this.props;
    return (
      <div className="friend-connect">
        <div className="friend-header">
          <span>Friend Request</span>
        </div>
        <hr style={{ margin: 0, width: "calc(100% - 20px)" }} />
        {FriendRequestList.length ? (
          FriendRequestList.map((friend) => (
            <FriendRequest key={friend._id} friend={friend} />
          ))
        ) : (
          <div className="no-friend-request">No friend request</div>
        )}
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    setFriendRequestList: (requestList) =>
      dispatch(setFriendRequest(requestList)),
  };
};
const mapStateToProps = (state) => {
  return {
    FriendRequestList: state.Friend.FriendRequest,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(FriendConnect);
