import React from "react";
import CurrentUserPost from "./posts/curruser-post.component";
import { BsThreeDots } from "react-icons/bs";
import "./profilePageContent.style.scss";

class ProfilePageContent extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className="profile-page-content">
        <div className="content-body">
          <div className="profile-page-navbar">
            <div className="nav-option">Posts</div>
            <div className="nav-option">About</div>
            <div className="nav-option">Friends</div>
            <div className="nav-option">Photos</div>
            <div className="nav-option-end">
              <div className="option">
                <BsThreeDots />
              </div>
            </div>
          </div>
          <div className="profile-user-posts">
            <CurrentUserPost user={this.props.user} />
          </div>
        </div>
      </div>
    );
  }
}

export default ProfilePageContent;
