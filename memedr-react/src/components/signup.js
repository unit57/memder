import React, { Component } from 'react'; // eslint-disable-next-line
import { BrowserRouter as Route, Redirect, NavLink } from 'react-router-dom';
import '../App.css';
// the method new user data uses the methosid passed down - serUserName - that takes the refes of the input as array values, passes them back up and makes an axios call to store them in the usere db   
export default class SignUp extends Component {
  newUserData() {
    this.props.setUserName([
      this.refs.username.value,
      this.refs.password.value,
      this.refs.email.value,
      this.refs.location.value,
      this.refs.gender.value,
      this.refs.image.value,
      this.refs.age.value
    ]);
  }
// the button create account runs the this.newUserData method
  render() {
    return (
      <div>
        <div className="bigBorder container">
          <div className="signUpDiv profileContainer container">
            <div className="infoDiv">
              <p id="signInError">{this.props.errorMessage}</p>
              <p>username <input required type="text" ref="username" /></p>
              <p>email <input type="email" ref="email" /></p>
              <p>password <input type="password" ref="password" /></p>

              <p>location <select ref="location">
               <option value="Queens">Queens</option>
               <option value="Manhattan">Manhattan</option>
               <option value="Staten Island">Staten Island</option>
               <option value="Brookyln">Brooklyn</option>
               <option value="Bronx">Bronx</option>
              </select></p>

              <p>gender <select ref="gender">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select></p>

              <p>profile image link <input type="url" ref="image" defaultValue="https://memedr.herokuapp.com/images/default.jpg" /></p>
              <p>age ( must be 18 + ) <input type="number" ref="age" min="18" max="100" /></p>
              <p><NavLink onClick={this.props.clearError} to="/tos">Did you read the Terms of Service?</NavLink> <input type="checkbox" /></p>
              <p className="centerText"><NavLink onClick={this.props.clearError} to="/">Already have an account? Login!</NavLink></p>
              <button className="btn btn-primary btn-msm createAccountButton" onClick={() => this.newUserData()}>Create Account</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}