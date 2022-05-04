import React from "react";
import Avatar from "./../../avatar/avatar.component";
import { howLongAgo } from "../../../utils/utils";
import { BsThreeDots } from "react-icons/bs";
import axios from "axios";

import { connect } from "react-redux";
const API = process.env.REACT_APP_BACKEND_URL;

class PostHeader extends React.Component {
  constructor() {
    super();
    this.state = {
      isComment: false,
      likesCount: 0,
      isLiked: false,
      isDropdownOpen: false,
    };
  }
  componentDidMount() {}
  handleDeleteClick = async () => {
    try {
      const response = await axios({
        method: "DELETE",
        url: `${API}/api/post/${this.props._id}`,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        },
      });
      if (response.status === 200) {
        console.log(this.props._id, " deleted");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  render() {
    const { postedBy, user, createdAt } = this.props;
    return (
      <div className="post-header">
        <div className="user-img-container">
          <Avatar
            height="60px"
            width="60px"
            userImg={`${API}/api/public/user/profilePhoto/${user.profilePhoto}`}
          />
        </div>
        <div className="header-details">
          <span className="author">
            {postedBy.firstName + " " + postedBy.lastName}
          </span>
          <div className="author-at">{howLongAgo(createdAt)} </div>
        </div>
        <div className="header-right">
          <BsThreeDots
            className={`three-dots ${
              this.state.isDropdownOpen ? "three-dots-active" : null
            }`}
            onClick={() =>
              this.setState({ isDropdownOpen: !this.state.isDropdownOpen })
            }
          />
          {this.state.isDropdownOpen ? (
            <div className="userpost-dropdown">
              {postedBy._id === user._id ? (
                <div
                  className="dw-section disable-select"
                  onClick={this.handleDeleteClick}
                >
                  Delete
                </div>
              ) : null}
              <div className="dw-section disable-select">Copy Link</div>
              <div className="dw-section disable-select">Report</div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user.currentUser,
  };
};
export default connect(mapStateToProps)(PostHeader);
