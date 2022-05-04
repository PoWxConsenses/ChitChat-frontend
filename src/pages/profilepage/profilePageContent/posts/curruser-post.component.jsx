import React from "react";
import axios from "axios";
import UserPost from "../../../../components/userpost/userpost.component";
import "./curruser.style.scss";

class CurrentUserPost extends React.Component {
  constructor() {
    super();
    this.state = {
      currUserPost: [],
    };
  }
  componentDidMount() {
    const API = process.env.REACT_APP_BACKEND_URL;
    axios({
      method: "GET",
      url: `${API}/api/post/user/${this.props.user._id}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
      },
    })
      .then((response) => {
        if (response.status == 200) {
          this.setState({ currUserPost: response.data.post });
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  render() {
    return (
      <div className="curruser-posts">
        {this.state.currUserPost.map((post) => {
          post.postedBy = this.props.user;
          return <UserPost key={post._id} {...post} />;
        })}
      </div>
    );
  }
}

export default CurrentUserPost;
