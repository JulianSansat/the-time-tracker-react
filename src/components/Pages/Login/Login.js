import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../../actions";

import Logo from "../../../assets/logo1.png";

class SignIn extends Component {
  state = {
    email: "",
    password: "",
    error: ""
  };

  handleSignIn = async e => {
    e.preventDefault();
    const { email, password } = this.state;
    if (!email || !password) {
      this.setState({ error: "Complete all fields to proced" });
    } else {
      this.props.login(email, password);
    }
  };

  render() {
    return (
      <section className="section">
        <form onSubmit={this.handleSignIn}>
          <div className="field is-grouped is-grouped-centered">
            <img src={Logo} alt="timetrackerlogo" />
          </div>
          {this.state.error && (
            <div className="notification is-danger">
              <p>{this.state.error}</p>
            </div>
          )}
          <div className="field">
            <label className="label">Email</label>
            <div className="control has-icons-left has-icons-right">
              <input
                type="email"
                className="input"
                placeholder="Email"
                onChange={e => this.setState({ email: e.target.value })}
              />
              <span className="icon is-small is-left">
                <i className="fa fa-envelope" />
              </span>
            </div>
          </div>
          <div className="field">
            <label className="label">Password</label>
            <p className="control has-icons-left">
              <input
                type="password"
                className="input"
                placeholder="Password"
                onChange={e => this.setState({ password: e.target.value })}
              />
              <span className="icon is-small is-left">
                <i className="fa fa-lock" />
              </span>
            </p>
          </div>
          <div className="field is-grouped is-grouped-centered">
            <p className="control">
              <button className="button is-primary" type="submit">
                Login
              </button>
            </p>
            <p className="control">
              <Link className="button is-light" to="/register">
                Create an account
              </Link>
            </p>
          </div>
        </form>
      </section>
    );
  }
}

export default withRouter(
  connect(
    null,
    { login }
  )(SignIn)
);
