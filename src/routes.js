import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { isAuthenticated } from "./services/auth";
import Register from "./components/Pages/Register/Register";
import Login from "./components/Pages/Login/Login";
import Layout from "./components/Layout/Layout";
import Home from "./components/Pages/Home/Home";
import Test from "./components/Pages/Home/Test";

const PrivateRoute = ({ component: Component, ...rest }) => (
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

const LoginRoute = ({ component: Component, ...rest }) => (
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

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <LoginRoute exact path="/" component={Login} />
      <LoginRoute path="/register" component={Register}/>
      <PrivateRoute path="/home" component={Home} />
      <PrivateRoute path="/test" component={Test} />
      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;