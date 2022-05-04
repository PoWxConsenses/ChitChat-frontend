import React from "react";
import "./video.style.scss";
class Video extends React.Component {
  constructor() {
    super();
    this.state = {
      isPlaying: false,
    };
  }
  togglePlayVideo = () => {
    if (this.state.isPlaying) this.refs.vidRef.play();
    else this.refs.vidRef.pause();
    this.setState({ isPlaying: !this.state.isPlaying });
  };
  render() {
    return (
      <video
        ref="vidRef"
        src={this.props.video}
        type="video/mp4"
        height={this.props.height}
        width={this.props.width}
        onClick={this.togglePlayVideo}
        className="videooo"
      ></video>
    );
  }
}

export default Video;
