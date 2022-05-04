import React from "react";
import "./right-block.style.scss";

class RightBlock extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="right-block">
        <div className="right-upper-box"></div>
        <div className="right-lower-box">Copy right chinmay</div>
      </div>
    );
  }
}

export default RightBlock;
