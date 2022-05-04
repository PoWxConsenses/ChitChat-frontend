import React from "react";
import { connect } from "react-redux";
import "./userpost.style.scss";

import Carousel from "../Carousel/Carousel.component";
import Footer from "./footer/footer.component";
import PostHeader from "./header/header.component";

class UserPost extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { textContent, postedBy, createdAt, mediaContent, _id } = this.props;
    return (
      <div className="user-post">
        <div className="post-container">
          <PostHeader postedBy={postedBy} createdAt={createdAt} _id={_id} />
          <hr className="header-seperator" />

          <div className="post-content">
            <div className="text-content">{textContent}</div>
            {/* TODO:  flex*/}
            {mediaContent.images.length || mediaContent.videos.length ? (
              <div className="img-vid-content">
                <Carousel
                  mediaContent={[
                    ...mediaContent.images,
                    ...mediaContent.videos,
                  ]}
                  height="354px"
                  width="100%"
                  locationFolder="postMediaContent"
                />
              </div>
            ) : null}
            <Footer likes={this.props.likes} postId={this.props._id} />
          </div>
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
export default connect(mapStateToProps)(UserPost);
