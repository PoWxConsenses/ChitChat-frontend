import React from "react";
import "./image.style.scss";
class Image extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <img
        src={this.props.image}
        alt="?"
        height={this.props.height}
        width={this.props.width}
      />
    );
  }
}

export default Image;
