const INITIAL_STATE = {
  FriendRequest: [],
  friendList: [],
  filterFriendList: [],
};

const FriendReducer = (state = INITIAL_STATE, actions) => {
  switch (actions.type) {
    case "SET_FRIEND_REQUEST":
      return {
        ...state,
        FriendRequest: actions.payload,
      };
    case "DELETE_FRIEND_REQUEST":
      return {
        ...state,
        FriendRequest: state.FriendRequest.filter(
          (user) => user.sentBy._id != actions.payload
        ),
      };
    case "SET_FRIEND_LIST":
      return {
        ...state,
        friendList: actions.payload,
        filterFriendList: actions.payload,
      };
    case "FILTER_FRIEND_LIST": {
      const filterFriendList = state.friendList.filter((friend) =>
        (friend.firstName + " " + friend.lastName).startsWith(actions.payload)
      );
      return {
        ...state,
        filterFriendList: filterFriendList,
      };
    }
    default:
      return state;
  }
};

export default FriendReducer;
