import React from "react";
import { connect } from "react-redux";
import "./profilePage.style.scss";
import ProfileHeader from "./profile-header/profile-header.component";
import ProfilePageContent from "./profilePageContent/profilePageContent.component";
import queryString from "query-string";
import axios from "axios";

class ProfilePage extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null,
      userName: null,
    };
  }
  setUser = async () => {
    const { userName } = this.props.match.params;
    if (this.state.userName != userName) {
      const API = process.env.REACT_APP_BACKEND_URL;
      axios({
        method: "GET",
        url: `${API}/api/user/getUserWithUserName/${userName}`,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        },
      })
        .then((response) =>
          this.setState({
            user: response.data.user,
            userName: response.data.user.userName,
          })
        )
        .catch((err) => console.log(err.message));
    }
  };
  componentDidUpdate() {
    this.setUser();
  }
  componentDidMount() {
    this.setUser();
  }
  render() {
    const { user } = this.state;
    if (user)
      return (
        <div className="user-profile-page">
          <ProfileHeader user={user} />
          <ProfilePageContent user={user} />
        </div>
      );
    else return <div className="profileLoading">Loading...</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser,
  };
};
export default connect(mapStateToProps)(ProfilePage);
