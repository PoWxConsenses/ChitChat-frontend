import React from "react";
import axios from "axios";
import Comment from "../../comment/comment.component";
import "./footer.style.scss";

import { connect } from "react-redux";
const API = process.env.REACT_APP_BACKEND_URL;

class Footer extends React.Component {
  constructor() {
    super();
    this.state = {
      isComment: false,
      likesCount: 0,
      isLiked: false,
      commentCount: 0,
    };
  }
  componentDidMount() {
    const { likes, user } = this.props;

    if (likes.includes(user._id)) this.setState({ isLiked: true });
    axios({
      method: "GET",
      url: `${API}/api/post/${this.props.postId}/comment?onlyCommentCount=true`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
      },
    })
      .then((response) =>
        this.setState({
          likesCount: likes.length,
          commentCount: response.data.commentCount,
        })
      )
      .catch((err) => console.log(err.message));
  }
  handleLikeClick = async () => {
    try {
      const response = await axios({
        method: "PATCH",
        url: `${API}/api/post/${this.props.postId}`,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        },
      });
      if (response.status === 200) {
        this.setState({
          isLiked: response.data.isLiked,
          likesCount: response.data.likesCount,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  render() {
    return (
      <div className="post-footer">
        <div className="social-interaction">
          <span className="interaction">{this.state.likesCount} likes</span>
          <span className="interaction">
            {this.state.commentCount} Comments
          </span>
        </div>
        <hr />
        <div className="post-actions">
          <div
            className={`action ${this.state.isLiked ? "liked" : null}`}
            onClick={this.handleLikeClick}
          >
            <pre className="disable-select">Like</pre>
          </div>
          <div
            className="action"
            onClick={() => this.setState({ isComment: !this.state.isComment })}
          >
            <pre className="disable-select">Comment</pre>
          </div>
          <div className="action">
            <pre className="disable-select">Share</pre>
          </div>
        </div>
        {this.state.isComment ? (
          <div className="post-comments">
            <hr className="footer-seperator" />
            <Comment postId={this.props.postId} />
          </div>
        ) : null}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user.currentUser,
  };
};
export default connect(mapStateToProps)(Footer);
