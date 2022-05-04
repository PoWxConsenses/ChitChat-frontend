import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import "./friendSuggestion.style.scss";
import ProfileCard from "./../profileCard/profile-card.component";
import { getFriendSuggestion } from "../../redux/friendSuggestion/friendSuggestion.actions";
class FriendSuggestion extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
    };
  }
  componentDidMount() {
    const API = process.env.REACT_APP_BACKEND_URL;
    axios({
      method: "GET",
      url: `${API}/api/connect/friendSuggestions`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
      },
    }).then((response) => {
      this.props.setFriendSuggestionList(response.data.friendSuggestion);
      this.setState({ isLoading: false });
    });
  }
  render() {
    if (this.state.isLoading) return null;
    else
      return (
        <div className="friend-suggestions">
          friend suggestions
          <hr style={{ margin: "10 0 0 0", width: "100%" }} />
          <div className="suggestion-type">
            {this.props.friendSuggestionList.map((suggestion) => (
              <ProfileCard
                key={suggestion._id}
                mutual="10"
                userName={suggestion.firstName + " " + suggestion.lastName}
                userId={suggestion._id}
                profileLink={suggestion.userName}
                userPhoto={suggestion.profilePhoto}
                coverPhoto={suggestion.coverPhoto}
                userOrg="Associate Professor, Indian Institute of Information Technology, Sri City"
              />
            ))}
          </div>
        </div>
      );
  }
}
const mapStateToProps = (state) => {
  return {
    friendSuggestionList: state.friendSuggestion.friendSuggestionList,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setFriendSuggestionList: (suggestionList) =>
      dispatch(getFriendSuggestion(suggestionList)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(FriendSuggestion);
