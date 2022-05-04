import { connect } from "react-redux";
import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../avatar/avatar.component";
import { togglePostModelWindow } from "../../redux/toggle/toggle.actions";
import PostModelWindow from "./../post-model-window/post-model-window.component";

import "./create-post.style.scss";
class CreatePost extends React.Component {
  render() {
    return (
      <div className="inner-create-post">
        <div className="avater-with-input">
          <Avatar height="50px" width="50px" userImg="https://bit.ly/3yTW8pL" />
          <div
            className="text-input-btn disable-select"
            onClick={() => this.props.togglePostModelWindow(true)}
          >
            What's in your mind?
          </div>
        </div>
        <hr className="top-seperator" />
        <div className="list-of-btn">
          <Link className="btn-list">
            <pre className="disable-select">Photo/Video</pre>
          </Link>
          <div className="btn-list">
            <pre className="disable-select">Tag Friend</pre>
          </div>
          <div className="btn-list">
            <pre className="disable-select">Feeling/Activity</pre>
          </div>
        </div>
        {this.props.isPostModelWindowOpen ? <PostModelWindow /> : null}
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    togglePostModelWindow: (isOpen) => dispatch(togglePostModelWindow(isOpen)),
  };
};
const mapStateToProps = (state) => {
  return {
    isPostModelWindowOpen: state.toggle.isPostModelWindowOpen,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);
