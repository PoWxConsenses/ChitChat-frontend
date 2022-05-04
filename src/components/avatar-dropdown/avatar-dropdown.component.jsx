import React from "react";
import { store } from "./../../redux/store";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./avatar-dropdown.style.scss";
import { toggleHeaderProfileDropdown } from "./../../redux/toggle/toggle.actions";
import Avatar from "./../avatar/avatar.component";
import { setCurrentUser } from "./../../redux/user/user.actions";
import axios from "axios";
const API = process.env.REACT_APP_BACKEND_URL;
class AvatarDropdown extends React.Component {
  constructor() {
    super();
  }
  closeDropDown = () => {
    this.props.toggleHeaderProfileDropdown();
  };
  handleSignOut = () => {
    axios({
      method: "GET",
      url: `${API}/api/auth/signOut`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
      },
    })
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          sessionStorage.setItem("jwt", response.data.token);
          this.props.setCurrentUser(null);
          store.dispatch({
            type: "USER_LOGGED_OUT",
          });
          this.closeDropDown();
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  render() {
    const { setCurrentUser, user } = this.props;
    return (
      <div className="avatar-dropdown">
        <div className="user-profile-dropdown">
          <div className="here-container">
            <Avatar
              height="50px"
              width="50px"
              userImg={`${API}/api/public/user/profilePhoto/${user.profilePhoto}`}
            />
            <span>
              {this.props.user.firstName + " " + this.props.user.lastName}
            </span>
          </div>
          <Link
            to={`/profile/${user.userName}`}
            className="to-profile"
            onClick={this.closeDropDown}
          >
            Profile
          </Link>
        </div>
        <Link className="dropdown-item" onClick={this.closeDropDown}>
          Setting & Privacy
        </Link>
        <Link className="dropdown-item" onClick={this.closeDropDown}>
          Switch Account
        </Link>
        <Link className="dropdown-item" onClick={() => this.handleSignOut()}>
          Sign out
        </Link>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentUser: (user) => dispatch(setCurrentUser(user)),
    toggleHeaderProfileDropdown: () => dispatch(toggleHeaderProfileDropdown()),
  };
};
const mapStateToProps = (state) => {
  return {
    user: state.user.currentUser,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AvatarDropdown);
