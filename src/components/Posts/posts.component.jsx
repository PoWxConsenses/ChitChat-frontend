import React from "react";
import axios from "axios";
import UserPost from "./../userpost/userpost.component";

class Posts extends React.Component {
  constructor() {
    super();
    this.state = {
      postsList: [],
    };
  }
  componentDidMount() {
    const API = process.env.REACT_APP_BACKEND_URL;
    axios({
      method: "GET",
      url: `${API}/api/post`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
      },
    })
      .then((response) => {
        if (response.status == 200) {
          this.setState({ postsList: response.data.post });
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  render() {
    return (
      <div className="posts-container">
        {this.state.postsList.map((post) => (
          <UserPost key={post._id} {...post} />
        ))}
      </div>
    );
  }
}

export default Posts;
