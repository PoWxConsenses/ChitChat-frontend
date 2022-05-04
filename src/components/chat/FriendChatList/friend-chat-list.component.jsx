import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { PushUserChat } from "./../../../redux/chat/chat.actions";
import { openChatInterface } from "../../../redux/chat/chat.actions";
import {
  ChangeCurrentFriend,
  AddCurrentUserChat,
} from "../../../redux/chat/chat.actions";
import "./friend-chat-list.style.scss";

import Avatar from "./../../avatar/avatar.component";
const API = process.env.REACT_APP_BACKEND_URL;

class FriendChatList extends React.Component {
  constructor() {
    super();
  }
  componentDidMount() {}
  handleOnClick = async (
    friend,
    changeCurrentFriend,
    addCurrentUserChat,
    openChatInterface
  ) => {
    axios({
      method: "GET",
      url: `${API}/api/chat/${friend._id}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
      },
    })
      .then((response) => {
        changeCurrentFriend(friend);
        addCurrentUserChat(response.data.chats);
        openChatInterface();
      })
      .catch((err) => console.log(err.message));
  };
  render() {
    const {
      friend,
      changeCurrentFriend,
      addCurrentUserChat,
      openChatInterface,
    } = this.props;
    const { firstName, lastName, profilePhoto, _id } = friend;
    const unreadMessage = this.props.chats[_id]
      ? this.props.chats[_id].reduce(
          (accumulatedCnt, chat) =>
            accumulatedCnt +
            (chat.status === "delivered" && chat.sender === _id ? 1 : 0),
          0
        )
      : "";
    return (
      <div
        className="friend-chat-list"
        onClick={async () =>
          await this.handleOnClick(
            friend,
            changeCurrentFriend,
            addCurrentUserChat,
            openChatInterface
          )
        }
      >
        <Avatar
          height="50px"
          width="50px"
          userImg={`${API}/api/public/user/profilePhoto/${profilePhoto}`}
        />
        <div className="in-list-right-data">
          <div className="in-list-top">
            <div className="in-list-friend-name">
              {firstName + " " + lastName}
            </div>
            <div className="last-chat-time">last-chat-time</div>
          </div>
          <div className="in-list-bottom">
            <div className="latest-chat-with">last-chat</div>
            <div className="chat-noti-right">
              {unreadMessage ? unreadMessage : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    chats: state.Chat.chats,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrentFriend: (friend) => dispatch(ChangeCurrentFriend(friend)),
    addCurrentUserChat: (chats) => dispatch(AddCurrentUserChat(chats)),
    PushUserChat: (chat) => dispatch(PushUserChat(chat)),
    openChatInterface: () => dispatch(openChatInterface()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(FriendChatList);
