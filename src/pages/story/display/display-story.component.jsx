import React from "react";
import Avatar from "./../../../components/avatar/avatar.component";
import Carousel from "../../../components/Carousel/Carousel.component";
import axios from "axios";
import "./display-story.style.scss";
const API = process.env.REACT_APP_BACKEND_URL;

class DisplayStory extends React.Component {
  constructor() {
    super();
    this.state = {
      author: null,
      mediaContent: [],
    };
  }
  componentDidMount() {
    const { userId } = this.props.match.params;
    axios({
      method: "GET",
      url: `${API}/api/user/${userId}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
      },
    })
      .then((response) => {
        this.setState({ user: response.data.user });
      })
      .catch((err) => console.log(err.message));
    axios({
      method: "GET",
      url: `${API}/api/story/user/${userId}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
      },
    })
      .then((response) => {
        const stories = response.data.stories;
        let bMediaContent = [];
        stories.map((story) => {
          if (story.mediaContent) bMediaContent.push(story.mediaContent);
          if (story.textContent)
            bMediaContent.push({
              textContent: story.textContent,
              type: "text",
            });
        });
        this.setState({ mediaContent: bMediaContent });
      })
      .catch((err) => console.log(err.message));
  }
  render() {
    const { user, mediaContent } = this.state;
    return (
      <div className="display-story-page">
        <div className="user-story-view">
          <div className="user-story-box">
            <div className="story-mediaContent-carousel">
              <div className="story-mediaContent-header">
                <div className="story-poster-avatar">
                  <Avatar
                    userImg={
                      user
                        ? `${API}/api/public/user/profilePhoto/${user.profilePhoto}`
                        : null
                    }
                    height="100%"
                    width="100%"
                  />
                </div>
                <div
                  className="story-author-name"
                  onClick={() =>
                    user
                      ? this.props.history.push(`/profile/${user.userName}`)
                      : null
                  }
                >
                  {user ? user.firstName + " " + user.lastName : null}
                </div>
              </div>
              <Carousel
                mediaContent={mediaContent.length ? mediaContent : ["1"]}
                locationFolder="storyMediaContent"
              />
            </div>
          </div>
        </div>

        <div className="user-story-options">
          <div className="options-body">
            <div className="options-footer">dcd</div>
          </div>
        </div>
      </div>
    );
  }
}

export default DisplayStory;
