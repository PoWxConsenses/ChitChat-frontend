import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; //local storage

import UserReducer from "./user/user.reducer";
import toggle from "./toggle/toggle.reducer";
import FriendSuggestionReducer from "./friendSuggestion/friendSuggestion.reducer";
import FriendReducer from "./friend/friend.reducer";
import PostReducer from "./post/post.reducer";
import ChatReducer from "./chat/chat.reducer";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["Post", "toggle"],
  // whiteList: ["user"],
  whiteList: [],
};
const appReducer = combineReducers({
  user: UserReducer,
  toggle: toggle,
  friendSuggestion: FriendSuggestionReducer,
  Friend: FriendReducer,
  Post: PostReducer,
  Chat: ChatReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "USER_LOGGED_OUT") {
    storage.removeItem("persist:root");
    // storage.removeItem('persist:otherKey')
    state = undefined;
  }
  return appReducer(state, action);
};

export default persistReducer(persistConfig, rootReducer);
