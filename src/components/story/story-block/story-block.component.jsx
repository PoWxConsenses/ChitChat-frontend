import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import IndStory from "../ind-story/story.component.style";
import "./story-block.style.scss";

class StoryBlock extends React.Component {
  constructor() {
    super();
    this.state = {
      followingList: [],
    };
  }
  componentDidMount() {
    const API = process.env.REACT_APP_BACKEND_URL;
    axios({
      method: "GET",
      url: `${API}/api/follow?populate=false`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
      },
    })
      .then((response) =>
        this.setState({ followingList: response.data.followingList })
      )
      .catch((err) => console.log(err.message));
  }
  scrollLeft = () => {
    document.querySelector(".story-container").scrollLeft -= 125;
  };
  scrollRight = () => {
    document.querySelector(".story-container").scrollLeft += 125;
  };
  render() {
    const { currentUser } = this.props;
    return (
      <div className="friends-story">
        <div className="scroll-story scroll-story-left">
          <pre onClick={this.scrollLeft}>
            <FaChevronLeft />
          </pre>
        </div>

        <div className="story-container">
          <IndStory
            key={currentUser._id}
            lastName={currentUser.lastName}
            firstName={currentUser.firstName}
            _id={currentUser._id}
            profilePhoto={currentUser.profilePhoto}
            itsMe={true}
          />
          {this.state.followingList.map((user) => (
            <IndStory key={user._id} {...user} itsMe={false} />
          ))}
        </div>
        <div className="scroll-story scroll-story-right">
          <pre onClick={this.scrollRight}>
            <FaChevronRight />
          </pre>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser,
  };
};
export default connect(mapStateToProps)(StoryBlock);
