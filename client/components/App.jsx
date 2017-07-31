import React, {Component} from 'react';
import Post from './Post.jsx';
import Search from './Search.jsx';
import Calculate from './Calculate.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: '',
      arrived: '',
      left: '',
    };
    this.handleInputPost = this.handleInputPost.bind(this);
    this.handleClickPost = this.handleClickPost.bind(this);
  }

  handleInputPost(input, type) {
    let element = input.target.value;
    this.setState({[type]: element});
  }
  
  handleClickPost(e) {
    e.preventDefault();
    if(this.state.date === '' || this.state.arrived === '' || this.state.left === '') {
      alert('You did not fill out the form completely, please try again!');
    } else {
      axios.post('/hours', {
        date: this.state.date,
        arrived: this.state.arrived,
        left: this.state.left,
      })
      .then( response => {
        console.log(response);
        alert('Hours successfully submitted!');
      })
      .catch(error => {
        console.log(error);
        alert('There was an error submitting your hours');
      })
      document.getElementById('form-post').reset();
    }
  }

  render() {
    return (
      <div>
        <h1>Hack Reactor Hours</h1>
        <div>
          <Post handleInputPost={this.handleInputPost} handleClickPost={this.handleClickPost}/>
        </div>
        <div>
          <Search />
        </div>
        <div>
          <Calculate />
        </div>
      </div>
    );
  }
}

export default App;