export const ChangeCurrentFriend = (friend) => {
  return {
    type: "CHANGE_CURRENT_FRIEND",
    payload: friend,
  };
};

export const PushUserChat = (payload) => {
  return {
    type: "PUSH_USER_CHAT",
    payload,
  };
};

export const AddCurrentUserChat = (chats) => {
  return {
    type: "ADD_CURRENT_USER_CHATS",
    payload: chats,
  };
};

export const openChatInterface = () => {
  return {
    type: "OPEN_CHAT_INTERFACE",
  };
};

export const changeChatStatus = (chatList) => {
  return {
    type: "CHANGE_CHAT_STATUS",
    payload: chatList,
  };
};

export const deleteChat = (chatToBeDeleted) => {
  return {
    type: "DELETE_CHATS",
    payload: chatToBeDeleted,
  };
};

export const countUnreadMessage = (payload) => {
  return {
    type: "COUNT_UNREAD_MESSAGE",
    payload,
  };
};

export const changeInputChatText = (payload) => {
  return {
    type: "CHANGE_INPUT_CHAT_TEXT",
    payload,
  };
};
