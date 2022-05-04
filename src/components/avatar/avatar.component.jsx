import React from "react";
import "./avatar.style.scss";
const Avatar = ({ userImg, height, width, handleClick }) => {
  return (
    <img
      className="avatar disable-select"
      src={userImg}
      alt="?"
      height={height}
      width={width}
      onClick={handleClick}
    />
  );
};
export default Avatar;
