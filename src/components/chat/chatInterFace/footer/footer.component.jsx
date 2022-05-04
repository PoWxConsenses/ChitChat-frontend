import React from "react";
import axios from "axios";
import EmojiPicker from "../../../emoji-picker/emoji-picker.component";
import { connect } from "react-redux";
import { socket } from "./../../../../service/socket";
import { PushUserChat } from "./../../../../redux/chat/chat.actions";
import { IoSendSharp } from "react-icons/io5";
import { changeInputChatText } from "./../../../../redux/chat/chat.actions";
import "./footer.style.scss";

class ChatInterfaceFooter extends React.Component {
  constructor() {
    super();
  }
  handleChange = (event) => {
    this.props.changeInputChatText({
      friendId: this.props.friend._id,
      chat: event.target.value,
    });
    socket.emit("typingStatusFromClient", {
      emittedFromRoomId: this.props.roomId,
      emittedToRoomId: this.props.friend.roomId,
      emittedFromUserId: this.props.userId,
      emittedToUserId: this.props.friend._id,
      userStatus: "...typing",
    });
  };
  handleSend = async (event) => {
    const API = process.env.REACT_APP_BACKEND_URL;
    axios({
      method: "POST",
      url: `${API}/api/chat/${this.props.friend._id}`,
      data: {
        textContent: this.props.inputChatText,
      },
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
      },
    })
      .then((response) => {
        this.props.PushUserChat({
          chat: response.data.chat,
          friendId: this.props.friend._id,
        });
        socket.emit("messageFromClient", {
          emittedFromRoomId: this.props.roomId,
          emittedToRoomId: this.props.friend.roomId,
          emittedFromUserId: this.props.userId,
          emittedToUserId: this.props.friend._id,
          chat: response.data.chat,
        });

        this.props.changeInputChatText({
          friendId: this.props.friend._id,
          chat: "",
        });
      })
      .catch((err) => console.log(err.message));
  };

  render() {
    return (
      <div className="inner-chat-right-bottom">
        <EmojiPicker
          handleChange={this.handleChange}
          inputChatText={this.props.inputChatText}
        />
        <input
          type="text"
          className="chat-input"
          onChange={this.handleChange}
          data-emoji-input="unicode"
          data-emojiable="true"
          value={this.props.inputChatText}
          placeholder="Type a message"
          onKeyPress={async (event) =>
            event.key === "Enter" ? await this.handleSend() : null
          }
        />
        <div className="chat-right-send" onClick={this.handleSend}>
          <IoSendSharp />
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    roomId: state.user.currentUser.roomId,
    userId: state.user.currentUser._id,
    friend: state.Chat.friend,
    inputChatText:
      state.Chat.friend._id in state.Chat.inputChatText
        ? state.Chat.inputChatText[`${state.Chat.friend._id}`]
        : "",
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    PushUserChat: (chat) => dispatch(PushUserChat(chat)),
    changeInputChatText: (payload) => dispatch(changeInputChatText(payload)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatInterfaceFooter);
