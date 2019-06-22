import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { LoggedRoutes, PublicRoutes } from "./routes";
import { connect } from "react-redux";
import "font-awesome/css/font-awesome.css";
import "./App.scss";

const App = props => {
  console.log(props.token);
  return <PublicRoutes />;
};

const mapStateToProps = state => {
  return {
    token: state.auth.token
  };
};

export default connect(mapStateToProps)(App);
