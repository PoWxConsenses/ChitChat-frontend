import React from "react";
import "./left-block.style.scss";

class LeftBlock extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="left-block">
        <div className="timeline-box"></div>
        <div className="online-friends"></div>
      </div>
    );
  }
}

export default LeftBlock;
