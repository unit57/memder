import React, { Component } from 'react'; // eslint-disable-next-line
import { BrowserRouter as Route, NavLink } from 'react-router-dom';
import '../App.css';

export default class Tos extends Component {

  render() {
    return (
      <div className="bigBorder container"> 
        <div className="navButtons">
          <NavLink to="/"><button className="homeButton btn btn-info" type="submit">Home</button></NavLink>
        </div>
          <div id="aboutMemedrDiv">
            <h3>Terms of Service</h3>
          </div>
      </div>
    );
  }
}