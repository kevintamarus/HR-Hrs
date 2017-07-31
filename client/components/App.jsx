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
  }

  handleInputPost(input, type) {
    let element = input.target.value;
    this.setState({[type]: element});
  }
  
  handleClickPost() {

  }

  render() {
    return (
      <div>
        <h1>Hack Reactor Hours</h1>
        <div>
          <Post handleInputPost={this.handleInputPost}/>
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