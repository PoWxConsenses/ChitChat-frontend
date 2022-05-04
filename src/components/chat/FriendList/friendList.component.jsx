import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import {
  setFriendList,
  filterFriendList,
} from "../../../redux/friend/friend.actions";
import FriendChatList from "./../FriendChatList/friend-chat-list.component";
import "./friendList.style.scss";

class FriendList extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    const API = process.env.REACT_APP_BACKEND_URL;
    axios({
      method: "GET",
      url: `${API}/api/user/friendList`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
      },
    })
      .then((response) => {
        this.props.setFriendList(response.data.friendList);
      })
      .catch((err) => console.log(err.message));
  }
  render() {
    return (
      <div className="left-chat-page">
        <div className="left-header">
          <input
            type="text"
            placeholder="Filter"
            name="friend-filter"
            className="friend-filter"
            onChange={(event) =>
              this.props.filterFriendList(event.target.value)
            }
          />
        </div>
        {this.props.filteredFriendList.map((friend) => (
          <FriendChatList key={friend._id} friend={friend} />
        ))}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    filteredFriendList: state.Friend.filterFriendList,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setFriendList: (friendList) => dispatch(setFriendList(friendList)),
    filterFriendList: (filterKey) => dispatch(filterFriendList(filterKey)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(FriendList);
