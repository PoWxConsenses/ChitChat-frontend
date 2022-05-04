import React from "react";
import Video from "../video/video.component";
import Image from "../image/image.component";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./Carousel.style.scss";
const API = process.env.REACT_APP_BACKEND_URL;
class Carousel extends React.Component {
  constructor() {
    super();
    this.state = {
      currentIdx: 0,
    };
  }
  nextSlide = () => {
    const { mediaContent } = this.props;
    if (mediaContent.length == this.state.currentIdx + 1)
      this.setState({ currentIdx: 0 });
    else this.setState({ currentIdx: this.state.currentIdx + 1 });
  };
  prevSlide = () => {
    const { mediaContent } = this.props;
    if (this.state.currentIdx === 0)
      this.setState({ currentIdx: mediaContent.length - 1 });
    else this.setState({ currentIdx: this.state.currentIdx - 1 });
  };
  render() {
    const { mediaContent } = this.props;
    const { currentIdx } = this.state;
    return (
      <div
        className="carousel-container disable-select"
        style={{ height: `${this.props.height}`, width: `${this.props.width}` }}
      >
        {mediaContent.length > 1 ? (
          <div className="carousel-left carousel-common">
            <FaChevronLeft className="arrow" onClick={this.prevSlide} />
          </div>
        ) : null}
        {mediaContent[currentIdx].type !== "text" ? (
          <div>
            {mediaContent[currentIdx].endsWith(".jpeg") ? (
              <Image
                image={`${API}/api/public/${this.props.locationFolder}/images/${mediaContent[currentIdx]}`}
                width="100%"
                height="100%"
              />
            ) : (
              <Video
                video={`${API}/api/public/${this.props.locationFolder}/videos/${mediaContent[currentIdx]}`}
                width="100%"
                height="100%"
              />
            )}
          </div>
        ) : (
          <div className="text-content-container">
            <div className="text-content">
              {mediaContent[currentIdx].textContent}
            </div>
          </div>
        )}
        {mediaContent.length > 1 ? (
          <div className="carousel-right carousel-common">
            <div className="plus-element">{"+" + mediaContent.length}</div>
            <FaChevronRight className="arrow" onClick={this.nextSlide} />
          </div>
        ) : null}
      </div>
    );
  }
}

export default Carousel;
