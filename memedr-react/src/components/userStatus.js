import React, { Component } from 'react';
import '../App.css';
// if the user is logged in then the log out button will appear
export default class UserStatus extends Component {
  renderLogInData() {
    if (this.props.loggedIn === true) {
      return <button className="btn btn-danger btn-xs" onClick={() => this.props.logout()}>Logout</button>;
    }
  }

  render() {
    return (
      <div>
        <h2 className="title">Memedr</h2>
        {this.renderLogInData()}
      </div>
    );
  }
}