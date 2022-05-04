import React from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "./logo.svg";
import "./header.style.scss";
import SearchBar from "./../CustomSearchBar/custom-search-bar.component";
import { AiFillHome, AiFillMessage } from "react-icons/ai";
import { FaUserFriends } from "react-icons/fa";
import { MdNotificationsActive } from "react-icons/md";
import { BsFillPersonFill, BsSearch } from "react-icons/bs";

import Avatar from "../avatar/avatar.component";

import { toggleHeaderProfileDropdown } from "./../../redux/toggle/toggle.actions";
import AvatarDropdown from "./../avatar-dropdown/avatar-dropdown.component";

import { connect } from "react-redux";
const API = process.env.REACT_APP_BACKEND_URL;

const Header = ({ toggleHeaderProfileDropdown, isHeaderProfileOpen, user }) => {
  return (
    <div className="header">
      <div className="header-center">
        <div className="header-start">
          <Link to="/">
            <Logo className="logo" />
          </Link>
          <div className="advance-search-engine">
            <SearchBar />
          </div>
          <BsSearch className="bs-search" />
        </div>

        <Link to="/" className="option">
          <AiFillHome />
        </Link>
        <Link to="/friends" className="option">
          <FaUserFriends />
        </Link>
        <Link to="/notifications" className="option">
          <MdNotificationsActive />
        </Link>
        <Link to="/chats" className="option">
          <AiFillMessage />
        </Link>

        <div className="header-end">
          <Avatar
            className="end-option"
            height="50px"
            width="50px"
            userImg={`${API}/api/public/user/profilePhoto/${user.profilePhoto}`}
            handleClick={toggleHeaderProfileDropdown}
          />
        </div>
      </div>
      {isHeaderProfileOpen ? <AvatarDropdown /> : null}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    user: state.user.currentUser,
    isHeaderProfileOpen: state.toggle.isHeaderProfileOpen,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    toggleHeaderProfileDropdown: () => dispatch(toggleHeaderProfileDropdown()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
