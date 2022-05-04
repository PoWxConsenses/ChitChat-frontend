import React from "react";
import axios from "axios";
import Avatar from "./../avatar/avatar.component.jsx";
import { connect } from "react-redux";
import { BsThreeDots } from "react-icons/bs";
import "./ind-comment.style.scss";
const API = process.env.REACT_APP_BACKEND_URL;

class IndComment extends React.Component {
  constructor() {
    super();
    this.state = {
      isDropdownOpen: false,
    };
  }
  handleDeleteClick = async () => {
    try {
      const response = await axios({
        method: "DELETE",
        url: `${API}/api/post/${this.props.commentedOn}/comment/${this.props._id}`,
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
    const { textContent, user, commentedBy } = this.props;
    return (
      <div className="commentBox">
        <Avatar
          height="40px"
          width="40px"
          userImg={`${API}/api/public/user/profilePhoto/${user.profilePhoto}`}
        />
        <div className="textContent">{textContent}</div>
        <div className="comment-options">
          <BsThreeDots
            onClick={() =>
              this.setState({ isDropdownOpen: !this.state.isDropdownOpen })
            }
          />
          {this.state.isDropdownOpen ? (
            <div className="comment-dropdown">
              {commentedBy === user._id ? (
                <div
                  className="dw-section disable-select"
                  onClick={this.handleDeleteClick}
                >
                  Delete
                </div>
              ) : null}
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
export default connect(mapStateToProps)(IndComment);
