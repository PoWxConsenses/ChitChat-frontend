import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { deleteChat } from "./../../../redux/chat/chat.actions";
import { socket } from "./../../../service/socket";
import { BiCheck, BiCheckDouble } from "react-icons/bi";
import { MdKeyboardArrowDown } from "react-icons/md";
import "./ind-chat.style.scss";
import { timeInHourAndMin } from "../../../utils/utils";

class IndChat extends React.Component {
  constructor() {
    super();
    this.state = {
      isDropdownOpen: false,
    };
  }
  deleteChat = async () => {
    try {
      const API = process.env.REACT_APP_BACKEND_URL;
      const response = await axios({
        method: "DELETE",
        url: `${API}/api/chat/${this.props.chat._id}`,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        },
      });
      if (response.status === 200) {
        socket.emit("chatDeletedFromClient", {
          emittedFromRoomId: this.props.user.roomId,
          emittedToRoomId: this.props.friend.roomId,
          emittedFromUserId: this.props.user._id,
          emittedToUserId: this.props.friend._id,
          chatId: [this.props.chat._id],
        });
        this.props.deleteChat({
          friendId: this.props.friend._id,
          chatId: [this.props.chat._id],
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    const { chat, fromWhere } = this.props;
    return (
      <div className={`${fromWhere} chat-common`}>
        <div
          className="ind-chat-dropdown "
          onClick={() =>
            this.setState({
              isDropdownOpen: !this.state.isDropdownOpen,
            })
          }
        >
          <MdKeyboardArrowDown />

          {this.state.isDropdownOpen ? (
            <div className="ind-chat-dropdown-options">
              {this.props.user._id === chat.sender ? (
                <div className="ind-chat-option" onClick={this.deleteChat}>
                  Delete
                </div>
              ) : null}
              <div
                className="ind-chat-option"
                onClick={() => console.log("report")}
              >
                Report
              </div>
            </div>
          ) : null}
        </div>
        <div className="ind-chat-content">{chat.textContent}</div>
        {fromWhere === "chat-from-you" ? (
          <div className="ind-chat-status">
            <div className="chat-time">{timeInHourAndMin(chat.createdAt)}</div>

            {chat.status === "sent" ? <BiCheck /> : null}
            {chat.status === "delivered" ? <BiCheckDouble /> : null}
            {chat.status === "read" ? (
              <BiCheckDouble style={{ color: "red" }} />
            ) : null}
          </div>
        ) : null}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user.currentUser,
    roomId: state.user.currentUser.roomId,
    friend: state.Chat.friend,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    deleteChat: (chatToBeDeleted) => dispatch(deleteChat(chatToBeDeleted)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(IndChat);
