import React from "react";
import axios from "axios";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";
import Feeds from "./pages/feeds/feeds.component";
import FriendsPage from "./pages/friends/friends.component";
import NotificationPage from "./pages/notification/notification.component";
import ChatPage from "./pages/chat/chat.component";
import Header from "./components/header/header.component";
import SignInAndSignUp from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import ProfilePage from "./pages/profilepage/profilePage.component";
import CreateStory from "./pages/story/create/create-story.component";
import DisplayStory from "./pages/story/display/display-story.component";
import { setCurrentUser } from "./redux/user/user.actions";
import { socket } from "./service/socket";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      isLoading: true,
    };
  }
  componentDidMount() {
    const API = process.env.REACT_APP_BACKEND_URL;
    axios({
      method: "GET",
      url: `${API}/api/user/loggedInUser`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          const user = response.data.user;
          this.props.setCurrentUser(user);
          socket.emit("joinRoom", {
            roomId: user.roomId,
          });
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
    this.setState({ isLoading: false });
  }
  // TODO: loading page here
  render() {
    if (this.state.isLoading) return <div>Loading</div>;
    else if (!this.props.user) return <SignInAndSignUp />;
    else
      return (
        <div className="parent">
          <Header />
          <Switch>
            <Route exact path="/" component={Feeds} />
            <Route exact path="/friends" component={FriendsPage} />
            <Route exact path="/notifications" component={NotificationPage} />
            <Route exact path="/chats" component={ChatPage} />
            <Route path="/profile/:userName" component={ProfilePage} />
            <Route exact path="/story/create" component={CreateStory} />
            <Route
              exact
              path="/story/display/:userId"
              component={DisplayStory}
            />
          </Switch>
        </div>
      );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user.currentUser,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
