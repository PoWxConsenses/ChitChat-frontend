const INITIAL_STATE = {
  friendSuggestionList: [],
};

const FriendSuggestionReducer = (state = INITIAL_STATE, actions) => {
  switch (actions.type) {
    case "GET_FRIEND_SUGGESTION":
      return {
        ...state,
        friendSuggestionList: actions.payload,
      };
    default:
      return state;
  }
};
export default FriendSuggestionReducer;
