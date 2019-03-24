import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Logo from "../../../assets/logo1.png";
import api from "../../../services/api";

class Register extends Component {
  state = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
    error: ""
  };

  handleSignUp = async e => {
    e.preventDefault();
    const { first_name, last_name, email, password, password_confirmation } = this.state;
    if (!first_name || !last_name || !email || !password || !password_confirmation || password !== password_confirmation) {
      this.setState({ error: "Complete all fields to register" });
    } else {
      try {
        await api.post("/auth/register", { first_name, last_name, email, password, password_confirmation });
        this.props.history.push("/");
      } catch (err) {
        console.log(err);
        this.setState({ error: err.response.data.error });
      }
    }
  };

  render() {
    return (
      <section className="section">
        <form onSubmit={this.handleSignUp}>
          <div className="field is-grouped is-grouped-centered">
            <img src={Logo} alt="timetrackerlogo"/>
          </div>
          {this.state.error && <div className="notification is-danger"><p>{this.state.error}</p></div>}
          <div className="field">
            <label className="label">First Name</label>
            <div className="control">
              <input
                type="text"
                className="input"
                placeholder="first name"
                onChange={e => this.setState({ first_name: e.target.value })}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Last Name</label>
            <div className="control">
              <input
                type="text"
                className="input"
                placeholder="last name"
                onChange={e => this.setState({ last_name: e.target.value })}
              />
            </div>
          </div>
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
                <i className="fa fa-envelope"></i>
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
                <i className="fa fa-lock"></i>
              </span>
            </p>
          </div>
          <div className="field">
          <label className="label">Password Confirmation</label>
            <p className="control has-icons-left">
              <input
                type="password"
                className="input"
                placeholder="Password confirmation"
                onChange={e => this.setState({ password_confirmation: e.target.value })}
              />
              <span className="icon is-small is-left">
                <i className="fa fa-lock"></i>
              </span>
            </p>
          </div>
          <div className="field is-grouped is-grouped-centered">
            <p className="control">
              <button className="button is-primary" type="submit">Register</button>
            </p>
            <p className="control">
              <Link className="button is-light" to="/">Login</Link>
            </p>
          </div>
        </form>
      </section>
    );
  }
}

export default withRouter(Register);