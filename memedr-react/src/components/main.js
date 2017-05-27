import React, { Component } from 'react'; // eslint-disable-next-line
import { Route, Redirect } from 'react-router-dom';
import axios from 'axios';

import MemeList from './memelist';

export default class Main extends Component {
  constructor(props) {
    super(props);

    //console.log(this.props.response);

    this.state = {
      memes: [],
      response: this.props.response,
    }
  }

  componentWillMount() {
    axios.get("https://memedr.herokuapp.com/getMemes")
      .then((res) => {

        this.setState({ memes: res.data.memes })

      }).catch((err) => { return err })
  }

  likeMeme(id) {
    console.log('like Meme clicked');

    //let memeid = event.target.getAttribute('id');
    //console.log("memeid " + memeid);
    /*axios.post("https://memedr.herokuapp.com/users/profile/save/" + id, {
      id: id,
      memeid: memeid
    });*/
  }

  unLikeMeme(id) {
    axios.delete("https://memedr.herokuapp.com/users/profile/delete/saved/" + id, {
      id: id,
    });
  }

  checkUserStatus() {
    if (!this.props.loggedIn) {
      return <Redirect to="/" />;
    }
  }

  render() {
    return (
      <div className="bigBorder">
        <div className="tempBorder">
          {this.checkUserStatus()}
          <br />
          <button>Matches</button>
          <button>Saves</button>
          <button>Main</button>

          <MemeList memes={this.state.memes} response={this.state.response} likeMeme={this.likeMeme} unLikeMeme={this.unLikeMeme} />
        </div>
      </div>
    );
  }
}