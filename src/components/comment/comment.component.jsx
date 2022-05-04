import React from "react";
import { connect } from "react-redux";
import Avatar from "./../avatar/avatar.component.jsx";
import IndComment from "../ind-comment/ind-comment.component.jsx";
import Loader from "react-loader-spinner";
import "./comment.style.scss";
import axios from "axios";
const API = process.env.REACT_APP_BACKEND_URL;

class Comment extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      commentList: [],
      commentInput: "",
    };
  }
  componentDidMount() {
    axios({
      method: "GET",
      url: `${API}/api/post/${this.props.postId}/comment/`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
      },
    })
      .then((response) => {
        this.setState({
          commentList: response.data.postComments,
          isLoading: false,
        });
      })
      .catch((err) => console.log(err.message));
  }
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  handleSubmit = async () => {
    if (this.state.commentInput == "") return;
    try {
      const response = await axios({
        method: "POST",
        url: `${API}/api/post/${this.props.postId}/comment`,
        data: {
          textContent: this.state.commentInput,
        },
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        },
      });
      if (response.status === 200) {
        this.setState({
          commentInput: "",
          commentList: [response.data.comment, ...this.state.commentList],
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  render() {
    return (
      <div className="comment">
        {this.state.isLoading ? (
          <Loader />
        ) : (
          <div className="comment-loaded">
            <div className="comment-form">
              <Avatar
                height="40px"
                width="40px"
                userImg={`${API}/api/public/user/profilePhoto/${this.props.user.profilePhoto}`}
              />
              <input
                type="text"
                value={this.state.commentInput}
                name="commentInput"
                onChange={this.handleChange}
                onKeyPress={async (event) => {
                  if (event.key === "Enter") await this.handleSubmit();
                }}
                className="comment-input"
              />
            </div>
            {this.state.commentList.map((comment) => (
              <IndComment key={comment._id} {...comment} />
            ))}
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user.currentUser,
  };
};
export default connect(mapStateToProps)(Comment);
