import axios from "axios";
import React from "react";
import { withRouter } from "react-router";
import Avatar from "./../../avatar/avatar.component";
import { Link } from "react-router-dom";
import { BsFillPlusCircleFill } from "react-icons/bs";
import "./story.style.scss";
const API = process.env.REACT_APP_BACKEND_URL;
class IndStory extends React.Component {
  constructor() {
    super();
    this.state = {
      stories: [],
      currentIdx: 0,
    };
  }
  isAnimationActive = undefined;
  componentDidMount() {
    axios({
      method: "GET",
      url: `${API}/api/story/user/${this.props._id}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
      },
    })
      .then((response) => {
        const stories = response.data.stories;
        stories.map((story) => {
          let stateObj = {};
          if (story.likes.includes("userId")) stateObj.isLiked = true;
          if (story.textContent) stateObj.textContent = story.textContent;
          if (story.mediaContent) stateObj.mediaContent = story.mediaContent;
          stateObj.isSeen = false;
          this.setState({ stories: [...this.state.stories, stateObj] });
        });
      })
      .catch((err) => console.log(err.message));
  }
  animateStory = () => {
    this.setState({
      currentIdx: (this.state.currentIdx + 1) % this.state.stories.length,
      stories: this.state.stories.map((story, idx) => {
        if (idx != this.state.currentIdx) return story;
        else
          return {
            ...this.state.stories[`${this.state.currentIdx}`],
            isSeen: true,
          };
      }),
    });
    if (this.state.currentIdx === 0)
      return clearTimeout(this.isAnimationActive);
    clearTimeout(this.isAnimationActive);
    this.isAnimationActive = setTimeout(this.animateStory, 5000);
  };
  render() {
    const { currentIdx, stories } = this.state;
    const { itsMe } = this.props;
    let bgImage = stories.length
      ? stories[currentIdx].hasOwnProperty("mediaContent")
        ? `${API}/api/public/storyMediaContent/${
            stories[currentIdx].mediaContent.endsWith(".mp4")
              ? "videos"
              : "images"
          }/${stories[currentIdx].mediaContent}`
        : ""
      : null;
    if (itsMe && !bgImage) {
      bgImage = `${API}/api/public/user/profilePhoto/${this.props.profilePhoto}`;
    }
    const emptyBarDeg = 10;
    const seenBarDeg =
      (((360 - emptyBarDeg * stories.length) / stories.length) * 100) / 360;
    let allStatusBar = "",
      tillNow = 0;
    for (let idx = 0; idx < stories.length; idx++) {
      tillNow += seenBarDeg;
      if (stories[idx].isSeen) allStatusBar += `green 0,green ${tillNow}%`;
      else allStatusBar += `grey 0,grey ${tillNow}%`;
      allStatusBar += ",";
      tillNow += (emptyBarDeg * 100) / 360;
      allStatusBar += `transparent 0,transparent ${tillNow}%`;
      if (idx < stories.length - 1) allStatusBar += ",";
    }
    return (
      <div
        className="story disable-select"
        style={
          bgImage
            ? {
                backgroundImage: `url(${bgImage})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }
            : null
        }
        onClick={(event) => {
          const cName = event.target.className;
          if (cName === "story-author-profile-img" || cName === "text-content")
            this.props.history.push(`/story/display/${this.props._id}`);
        }}
        onMouseEnter={() => {
          if (stories.length)
            this.isAnimationActive = setTimeout(this.animateStory, 2000);
        }}
        onMouseLeave={() => clearTimeout(this.isAnimationActive)}
      >
        <div className="over-img-or-video">
          <div className="story-content">
            {!itsMe ? (
              <div className="story-author-profile-img">
                <div
                  className="status-bar"
                  style={{
                    background: `conic-gradient(from 0deg, ${allStatusBar})`,
                  }}
                >
                  <Avatar
                    height="40px"
                    width="40px"
                    userImg={`${API}/api/public/user/profilePhoto/${this.props.profilePhoto}`}
                  />
                </div>
              </div>
            ) : null}
            <div className="text-content">
              {stories.length && stories[currentIdx].textContent
                ? stories[currentIdx].textContent
                : null}
            </div>
          </div>
          {itsMe ? (
            <Link to="story/create">
              <div className="story-add-btn story-commone ">
                <BsFillPlusCircleFill />
              </div>
            </Link>
          ) : null}
          <div className="story-author-name story-commone ">
            {this.props.firstName + " " + this.props.lastName}
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(IndStory);
