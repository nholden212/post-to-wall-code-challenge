import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import Wall from './components/Wall.js';

var config = {
    apiKey: "AIzaSyAYFGdKG89kOb6ir_AdV9CBEZynejltGDc",
    authDomain: "post-to-wall-code-challenge.firebaseapp.com",
    databaseURL: "https://post-to-wall-code-challenge.firebaseio.com",
    projectId: "post-to-wall-code-challenge",
    storageBucket: "post-to-wall-code-challenge.appspot.com",
    messagingSenderId: "1010570417746"
  };
  firebase.initializeApp(config);

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      activePostId: "",
      activePost: ""
    };
  }

  activatePost(id, name){
    this.setState({
      activePostId: id,
      activePost: name
    })
  }

  render() {
    return (
      <div className="App">
        <Wall
          firebase={firebase}
          activatePost={(id, name) => this.activatePost(id, name)}
          activePostId={this.state.activePostId}
        />
      </div>
    );
  }
}

export default App;
