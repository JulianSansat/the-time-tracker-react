import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "./services/auth";
import Layout from "./components/Layout/Layout";
import Home from "./components/Pages/Home/Home";
import Register from "./components/Pages/Register/Register";
import Login from "./components/Pages/Login/Login";

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Layout>
          <Component {...props} />
        </Layout>
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

export const LoginRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Redirect to={{ pathname: "/home", state: { from: props.location } }} />
      ) : (
        <Component {...props} />
      )
    }
  />
);

export const LoggedRoutes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute path="/home" component={Home} />
        <Route path="*" component={() => <h1>Page not found</h1>} />
      </Switch>
    </BrowserRouter>
  );
};

export const PublicRoutes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <LoginRoute exact path="/" component={Login} />
        <LoginRoute path="/register" component={Register} />
        <Route path="*" component={() => <h1>Page not found</h1>} />
      </Switch>
    </BrowserRouter>
  );
};
