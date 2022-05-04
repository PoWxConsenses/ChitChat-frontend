const INITIAL_STATE = {
  friendId: null,
  friend: null,
  chats: { efc: [] },
  inputChatText: {},
  isChatInterfaceOpen: false,
};

const ChatReducer = (state = INITIAL_STATE, actions) => {
  switch (actions.type) {
    case "CHANGE_CURRENT_FRIEND": {
      return {
        ...state,
        friend: actions.payload,
        friendId: actions.payload._id,
      };
    }
    case "ADD_CURRENT_USER_CHATS":
      if (!state.chats[`${state.friendId}`])
        state.chats[`${state.friendId}`] = [];

      return {
        ...state,
        chats: {
          ...state.chats,
          [`${state.friendId}`]: [...actions.payload],
        },
      };
    case "PUSH_USER_CHAT":
      const { payload } = actions;
      if (!state.chats[`${payload.friendId}`])
        state.chats[`${payload.friendId}`] = [];
      return {
        ...state,
        chats: {
          ...state.chats,
          [`${payload.friendId}`]: [
            ...state.chats[`${payload.friendId}`],
            payload.chat,
          ],
        },
      };
    case "OPEN_CHAT_INTERFACE":
      return {
        ...state,
        isChatInterfaceOpen: true,
      };
    case "CHANGE_CHAT_STATUS": {
      let newChats = state.chats;
      actions.payload.map(
        (data) =>
          (newChats[data.friendId] = newChats[data.friendId].map((chat) => {
            if (chat._id === data.chatId)
              return {
                ...chat,
                status: data.status,
              };
            else return chat;
          }))
      );
      return {
        ...state,
        chats: newChats,
      };
    }
    case "DELETE_CHATS": {
      let newChats = state.chats;
      const { friendId } = actions.payload;
      actions.payload.chatId.map(
        (chatId) =>
          (newChats[friendId] = newChats[friendId].filter((chat) => {
            if (chat._id !== chatId) return chat;
          }))
      );

      return {
        ...state,
        chats: state.chats,
      };
    }
    case "COUNT_UNREAD_MESSAGE": {
      return {
        ...state,
      };
    }
    case "CHANGE_INPUT_CHAT_TEXT": {
      return {
        ...state,
        inputChatText: {
          ...state.inputChatText,
          [`${actions.payload.friendId}`]: actions.payload.chat,
        },
      };
    }
    default:
      return state;
  }
};

export default ChatReducer;
