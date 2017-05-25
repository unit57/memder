import React, { Component } from 'react';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.userData);
    // console.log("user id~~~~~" + this.props.userData.id);
  }

  render() {
    return (
      <div className="bigBorder">
          <div className="tempBorder">
            <br/>
            <button>Matches</button>
            <button>Saves</button>
            <button>Main</button>

            <br/>
            <img src={this.props.userData.profile_image} className="profileImage" alt="profileImage.jpg"></img>
            <p>User Name: {this.props.userData.username}</p>
            <p>Email: {this.props.userData.email}</p>
            <p>Location: {this.props.userData.location}</p>
            <p>Gender: {this.props.userData.gender}</p>
            
            <br/><button>Edit Profile</button>
            <br/><button>Change Password</button>

            <br/><a href="https://memedr.herokuapp.com/users/nully/id"> Delete Account (Null account entry)</a>
          </div>
      </div>
    );
  }
}