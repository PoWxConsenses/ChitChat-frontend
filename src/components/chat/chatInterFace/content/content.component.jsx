import React from "react";
import { connect } from "react-redux";
import {
  changeChatStatus,
  PushUserChat,
  deleteChat,
} from "./../../../../redux/chat/chat.actions";
import { updateChat } from "../../../../utils/patchRequest";
import { socket } from "./../../../../service/socket";
import IndChat from "../../ind-chat/ind-chat.component";
import "./content.style.scss";
import { withRouter } from "react-router";

class ChatInterfaceContent extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };
  messageFromServer = (payload) => {
    if (
      payload.emittedFromUserId === this.props.friendId
      // && this.location.pathName === "/chats"
    ) {
      updateChat(payload.chat._id, { status: "read" });
      payload.chat.status = "read";
      socket.emit("messageStatusFromClient", {
        ...payload,
        status: "read",
      });
    } else {
      updateChat(payload.chat._id, { status: "delivered" });
      payload.chat.status = "delivered";
      socket.emit("messageStatusFromClient", {
        ...payload,
        status: "delivered",
      });
    }
    this.props.PushUserChat({
      chat: payload.chat,
      friendId: payload.emittedFromUserId,
    });
  };
  messageStatusFromServer = (payload) => {
    this.props.changeChatStatus([
      {
        chatId: payload.chat._id,
        friendId: payload.emittedToUserId,
        status: payload.status,
      },
    ]);
  };
  chatDeletedFromServer = (payload) => {
    this.props.deleteChat({
      friendId: payload.emittedFromUserId,
      chatId: payload.chatId,
    });
  };
  componentDidMount() {
    socket.on("messageFromServer", this.messageFromServer);
    socket.on("messageStatusFromServer", this.messageStatusFromServer);
    socket.on("chatDeletedFromServer", this.chatDeletedFromServer);
    this.scrollToBottom();
  }
  componentWillUnmount() {
    socket.off("messageFromServer", this.messageFromServer);
    socket.off("messageStatusFromServer", this.messageStatusFromServer);
    socket.off("chatDeletedFromServer", this.chatDeletedFromServer);
  }
  componentDidUpdate() {
    this.scrollToBottom();
  }
  render() {
    const { friend } = this.props;
    return (
      <div className="inner-user-friend-chat">
        {this.props.chats
          ? this.props.chats.map((chat) => (
              <IndChat
                chat={chat}
                friendId={this.props.friendId}
                fromWhere={
                  chat.receiver == friend._id
                    ? "chat-from-you"
                    : "chat-from-your-friend"
                }
              />
            ))
          : null}
        <div
          style={{ float: "left", clear: "both" }}
          ref={(el) => {
            this.messagesEnd = el;
          }}
        ></div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    friendId: state.Chat.friendId,
    friend: state.Chat.friend,
    chats: state.Chat.chats[`${state.Chat.friendId}`],
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    PushUserChat: (chat) => dispatch(PushUserChat(chat)),
    changeChatStatus: (chatList) => dispatch(changeChatStatus(chatList)),
    deleteChat: (chatToBeDeleted) => dispatch(deleteChat(chatToBeDeleted)),
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ChatInterfaceContent)
);
