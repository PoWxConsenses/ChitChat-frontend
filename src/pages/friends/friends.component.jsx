import React from "react";
import "./friends.style.scss";
import FriendSuggestion from "../../components/friendSuggestion/friendSuggestion.component";
import FriendConnect from "../../components/friendConnect/friendConnect.component";
const FriendsPage = () => {
  return (
    <div className="friends-page">
      <div className="left-block">
        <div className="manage-net">Manage my network</div>
        <div className="list-options">
          <div className="option">Connections</div>
          <div className="option">Contacts</div>
          <div className="option">People | Follow</div>
          <div className="option">Groups</div>
        </div>
      </div>
      <div className="right-block">
        <FriendConnect />
        <FriendSuggestion />
      </div>
    </div>
  );
};

export default FriendsPage;
