import React from "react";
import axios from "axios";
import "./sign-in.style.scss";
import FormInput from "../form-input/form-input.component";
import { connect } from "react-redux";
import { setCurrentUser } from "./../../redux/user/user.actions";
import { toggleSignInAndSignUp } from "./../../redux/toggle/toggle.actions";
class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.props = props;
  }
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    try {
      const API = process.env.REACT_APP_BACKEND_URL;
      const response = await axios.post(`${API}/api/auth/signin`, {
        email,
        password,
      });
      if (response.status == 200) {
        this.setState({ email: "", password: "" });
        sessionStorage.setItem("jwt", response.data.token);
        this.props.setCurrentUser(response.data.user);
      }
    } catch (err) {
      this.props.setCurrentUser(null);
      console.log(err.message);
    }
  };
  render() {
    return (
      <div className="sigin-form">
        <pre className="login-text">Login</pre>
        <form className="login-form" onSubmit={this.handleSubmit}>
          <FormInput
            label="Email"
            name="email"
            type="email"
            value={this.state.email}
            handleChange={this.handleChange}
            required
          />
          <FormInput
            label="Password"
            name="password"
            type="password"
            value={this.state.password}
            handleChange={this.handleChange}
            required
          />
          <button type="submit" className="submitBtn">
            Sign in
          </button>
        </form>
        <div>Forgot Password</div>
        <div className="signup-mssg">
          Don't have account?&nbsp;
          <div
            className="switch-to-signup"
            onClick={() => this.props.toggleSignInAndSignUp(false)}
          >
            Signup now
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentUser: (user) => dispatch(setCurrentUser(user)),
    toggleSignInAndSignUp: (isSignIn) =>
      dispatch(toggleSignInAndSignUp(isSignIn)),
  };
};
export default connect(null, mapDispatchToProps)(SignIn);
