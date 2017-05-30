import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import axios from 'axios';

// IMPORT COMPONENTS
import UserStatus from "./components/userStatus";
import Landing from './components/landing';
import About from "./components/about";
import Tos from "./components/tos";
import SignUp from "./components/signup";
import Profile from "./components/profile";
import Main from "./components/main";
import Matches from "./components/matches";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
      response: [],
      memes: [],
      matches: [],
      logMessage: "",
      disabled: false,
      chosenMeme: -1,
      hideAll: true
    };

    this.toggleDisabled = this.toggleDisabled.bind(this);
    this.getMyMatches = this.getMyMatches.bind(this);
  }
// method names that include 'component' are creating methods that include the component and the states passed down into them - this is necessary for react router
  userStatusComponent = () => {
    return (
      <UserStatus
        loggedIn={this.state.loggedIn}
        logout={this.logoutUserName.bind(this)}
      />
    );
  }
// this sets the 'disabled' for the like and unlike buttons
  toggleDisabled() {
    this.setState({
      disabled: !this.state.disabled
    });
  }
// when a user signs in with invalid or missing user info
  toggleErrorMessage() {
    this.setState({
      logMessage: ""
    });
  }

  changeView(chosenMeme, hideAll) {
    this.setState({ 
      chosenMeme: chosenMeme,
      hideAll: hideAll
    });
  }

  clearMatches() {
    this.setState({
      matches: []      
    });
  }

  // log in 
  landingComponent = () => {
    return (
      <Landing
        errorMessage={(this.state.logMessage !== undefined) ? this.state.logMessage : ""}
        logUserName={this.loggingUserName.bind(this)}
        clearError={this.toggleErrorMessage.bind(this)}
      />
    );
  }
// sign up
  signupComponent = () => {
    return (
      <SignUp
        errorMessage={(this.state.logMessage !== undefined) ? this.state.logMessage : ""}
        setUserName={this.settingUserName.bind(this)}
        clearError={this.toggleErrorMessage.bind(this)}
      />
    );
  }
// the page where auser likes the memes
  mainComponent = () => {
    return (
      <Main
        disabled={this.state.disabled}
        userData={(this.state.response !== undefined) ? this.state.response : []}
        memes={this.state.memes}
        setMemeList={this.mainMemeList.bind(this)}
        toggleDisabled={this.toggleDisabled.bind(this)}
        changeView={this.changeView.bind(this)}
        chosenMeme={this.state.chosenMeme}
        hideAll={this.state.hideAll}
        clearMatches={this.clearMatches.bind(this)}
      />
    );
  }
// user profile
  profileComponent = () => {
    return (
      <Profile
        userData={(this.state.response !== undefined) ? this.state.response : []}
      />
    );
  }
// matches
  matchesComponent = () => {
    return (
      <Matches
        disabled={this.state.disabled}
        userData={(this.state.response !== undefined) ? this.state.response : []}
        setMatchesList={this.getMyMatches.bind(this)}
        matches={this.state.matches}
        toggleDisabled={this.toggleDisabled.bind(this)}
        chosenMeme={this.state.chosenMeme}
      />
    );
  }
// log out - send axios call to log out user
  logoutUserName() {
    axios.get("https://memedr.herokuapp.com/auth/logout")
      .then((response) => {
        this.setState({
          response: [],
          loggedIn: response.data.loggedIn,
          logMessage: ""
        });
      }).catch(function (error) {
        console.log(error);
      });
  }
// logs the user in - sends their user name and password and if valid sends back an object with the users data and sets the state of logged in 
  loggingUserName(submittedName, submittedPassword) {
    axios.post("https://memedr.herokuapp.com/auth/login", {
      username: submittedName,
      password: submittedPassword
    }).then((response) => {
      this.setState({
        response: response.data.user_profile,
        loggedIn: response.data.loggedIn,
        logMessage: response.data.status
      });
    }).catch(function (error) {
      console.log(error);
    });
  }
// posts user data on sign up 
  settingUserName(signupDataArray) {
    axios.post("https://memedr.herokuapp.com/auth/register", {
      username: signupDataArray[0],
      password: signupDataArray[1],
      email: signupDataArray[2],
      location: signupDataArray[3],
      gender: signupDataArray[4],
      profile_image: signupDataArray[5],
      age: signupDataArray[6]
    }).then((response) => {
      this.setState({
        response: response.data.user_profile,
        loggedIn: response.data.loggedIn,
        logMessage: response.data.message
      });
    }).catch(function (error) {
      console.log(error);
    });
  }

  shuffle(memes) {
    let length = memes.length;
    let last;
    let random;

    while (length) {
      random = Math.floor(Math.random() * (length -= 1));
      last = memes[length];
      memes[length] = memes[random];
      memes[random] = last;
    }
    return memes;
  }

// returns an object with the memes stored in getMemes end point
  mainMemeList() {
    axios.get("https://memedr.herokuapp.com/getMemes")
      .then((response) => {

        let theMemes = this.shuffle(response.data.memes);

        this.setState({
          memes: theMemes
        });
      }).catch((error) => {
        console.log(error);
      });
  }
// returns an object with the users in patches stored in matches end point
  getMyMatches() {
    let id = this.state.response.id;
    axios.get("https://memedr.herokuapp.com/users/profile/matches/" + id, {id})
      .then((response) => {
        this.setState({ 
          matches: response.data.data 
        }); 
      }).catch((error) => { 
        console.log(error); 
      });
  }
// the following selects what links lead to whick routes baseed on if a user is logged in or not
  checkLogin(authPath) {
    if(this.state.loggedIn === true) {
      switch(authPath) {
        case "/main":
          return this.mainComponent();
        case "/profile":
          return this.profileComponent();
        case "/matches":
          return this.matchesComponent();
        default:
          return (<Redirect to="/main"/>);
      }
    }

    else {
      switch(authPath) {
        case "/":
          return this.landingComponent();
        case "/signup":
          return this.signupComponent();
        default:
          return (<Redirect to="/"/>);
      }
    }
  }
// here we use react router to create our routes, run through the log in check (immediately above) and if logged in serve up the component methods
  render() {
    return (
      <div className="App-header">
        <Router>
          <div id="wrapper">
            <Route render={() => this.userStatusComponent()}></Route>
            <Switch>
              <Route path="/" exact render={() => this.checkLogin("/")}></Route>
              <Route path="/signup" render={() => this.checkLogin("/signup")}></Route>
              <Route path="/about" component={About}></Route>
              <Route path="/tos" component={Tos}></Route>

              <Route path="/main" render={() => this.checkLogin("/main")}></Route>
              <Route path="/profile" render={() => this.checkLogin("/profile")}></Route>
              <Route path="/matches" render={() => this.checkLogin("/matches")}></Route>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}