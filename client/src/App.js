import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { setAuthToken } from "./utils";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { clearCurrentProfile } from "./actions/profileActions";

import { Provider } from "react-redux";
import { store } from "./createStore";

import PrivateRoute from "./components/custom/PrivateRoute";
import Navbar from "./components/layout/Navbar";
import Dashboard from "./components/layout/Dashboard";
import Landing from "./Routes/Landing";
import Register from "./Routes/auth/Register";
import Login from "./Routes/auth/Login";
import CreateProfile from "./Routes/profile/CreateProfile";
import FullProfile from "./Routes/profile/FullProfile";
import EditProfile from "./Routes/profile/EditProfile";
import NotFound from "./Routes/NotFound";
import Footer from "./components/layout/Footer";
import ProfileList from "./Routes/profile/ProfileList";
import FullPost from "./Routes/posts/FullPost";
import Posts from "./Routes/posts/Posts";

import "./App.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);

  const jwt = jwt_decode(localStorage.token);

  store.dispatch(setCurrentUser(jwt));

  const currentTime = Date.now() / 1000;

  if (jwt.exp < currentTime) {
    store.dispatch(logoutUser());
    store.dispatch(clearCurrentProfile());
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profile/:handle" component={FullProfile} />
              <Route exact path="/profiles" component={ProfileList} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={EditProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/feed" component={Posts} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/post/:id" component={FullPost} />
              </Switch>
              <Route exact path="/notfound" component={NotFound} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
