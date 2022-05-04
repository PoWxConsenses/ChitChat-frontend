import React from "react";
import { connect } from "react-redux";
import FriendList from "../../components/chat/FriendList/friendList.component";
import "./chat.style.scss";
import ChatInterface from "../../components/chat/chatInterFace/ChatInterface.component";
class ChatPage extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {}
  render() {
    return (
      <div className="chat-page">
        <div className="inner-block">
          <FriendList />
          {this.props.isChatInterfaceOpen ? (
            <ChatInterface />
          ) : (
            <div>vrokml</div>
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isChatInterfaceOpen: state.Chat.isChatInterfaceOpen,
  };
};
export default connect(mapStateToProps)(ChatPage);
