import React from "react";
import "./ChatInterface.style.scss";
import ChatInterfaceHeader from "./header/header.component";
import ChatInterfaceContent from "./content/content.component";
import ChatInterfaceFooter from "./footer/footer.component";

class ChatInterface extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="right-chat-page">
        <div className="chat-right-header">
          <ChatInterfaceHeader />
        </div>
        <div className="user-friend-chat">
          <ChatInterfaceContent />
        </div>
        <div className="chat-right-bottom">
          <ChatInterfaceFooter />
        </div>
      </div>
    );
  }
}

export default ChatInterface;
