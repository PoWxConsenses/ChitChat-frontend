export const getFriendSuggestion = (friendSuggestionList) => {
  return {
    type: "GET_FRIEND_SUGGESTION",
    payload: friendSuggestionList,
  };
};
