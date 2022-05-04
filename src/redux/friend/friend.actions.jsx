export const setFriendRequest = (friendRequestList) => {
  return {
    type: "SET_FRIEND_REQUEST",
    payload: friendRequestList,
  };
};

export const deleteFriendRequest = (friendId) => {
  return {
    type: "DELETE_FRIEND_REQUEST",
    payload: friendId,
  };
};

export const setFriendList = (friendList) => {
  return {
    type: "SET_FRIEND_LIST",
    payload: friendList,
  };
};

export const filterFriendList = (filterKey) => {
  return {
    type: "FILTER_FRIEND_LIST",
    payload: filterKey,
  };
};
