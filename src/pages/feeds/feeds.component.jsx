import React from "react";
import "./feeds.style.scss";
import Posts from "../../components/Posts/posts.component";
import StoryBlock from "../../components/story/story-block/story-block.component";
import CreatePost from "../../components/create-post/create-post.component";
import LeftBlock from "./left-block/left-block.component";
import RightBlock from "./right-block/right-block.component";

const Feeds = () => {
  return (
    <div className="feed-page">
      <div className="left-block-container">
        <LeftBlock />
      </div>
      <div className="feed-content">
        <div className="inner-feed-content">
          <StoryBlock />
          <div className="create-post">
            <CreatePost />
          </div>

          <div className="users-post">
            <Posts />
          </div>
        </div>
      </div>
      <div className="right-block-container">
        <RightBlock />
      </div>
    </div>
  );
};

export default Feeds;
