import React from "react";
import axios from "axios";
import "./sign-up.style.scss";
import FormInput from "../form-input/form-input.component";
import { connect } from "react-redux";
import { setCurrentUser } from "./../../redux/user/user.actions";
import { toggleSignInAndSignUp } from "./../../redux/toggle/toggle.actions";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      passwordConfirm: "",
      DOB: "",
      gender: "",
      firstName: "",
      lastName: "",
    };
  }
  handleChange = (event) => {
    const { name, value } = event.target;
    console.log({ name, value });
    this.setState({ [name]: value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const {
      email,
      password,
      passwordConfirm,
      DOB,
      firstName,
      lastName,
      gender,
    } = this.state;
    console.log({
      email,
      password,
      passwordConfirm,
      DOB,
      firstName,
      lastName,
      gender,
    });
    const API = process.env.REACT_APP_BACKEND_URL;
    axios({
      method: "POST",
      url: `${API}/api/auth/signUp`,
      data: {
        email,
        password,
        passwordConfirm,
        DOB,
        firstName,
        lastName,
        gender,
      },
    })
      .then((response) => {
        sessionStorage.setItem("jwt", response.data.token);
        this.props.setCurrentUser(response.data.user);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  render() {
    return (
      <div className="signup-form">
        <pre className="signup-text">Sign up</pre>
        <form className="login-form" onSubmit={this.handleSubmit}>
          <div className="first-last-name">
            <FormInput
              label="First Name"
              name="firstName"
              type="text"
              value={this.state.firstName}
              handleChange={this.handleChange}
              required
            />
            <FormInput
              label="Last Name"
              name="lastName"
              type="text"
              value={this.state.lastName}
              handleChange={this.handleChange}
              required
            />
          </div>
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
          <FormInput
            label="Confirm Password"
            name="passwordConfirm"
            type="password"
            value={this.state.passwordConfirm}
            handleChange={this.handleChange}
            required
          />
          <div className="first-last-name">
            <FormInput
              label="Gender"
              name="gender"
              type="text"
              value={this.state.gender}
              handleChange={this.handleChange}
              required
            />
            <FormInput
              label="DOB"
              name="DOB"
              type="text"
              value={this.state.DOB}
              handleChange={this.handleChange}
              required
            />
          </div>
          <button type="submit" className="submitBtn">
            Sign up
          </button>
        </form>

        <div className="signin-mssg">
          Do you have account?&nbsp;
          <div
            className="switch-to-signin"
            onClick={() => this.props.toggleSignInAndSignUp(true)}
          >
            Sign in now
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
export default connect(null, mapDispatchToProps)(SignUp);
