import React, {Component} from 'react';
import Post from './Post.jsx';
import Search from './Search.jsx';
import Calculate from './Calculate.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      info: [],
      date: '',
      arrived: '',
      left: '',
      searchType: 'all',
      searchValue: '',
    };
    this.handleInputPost = this.handleInputPost.bind(this);
    this.handleClickPost = this.handleClickPost.bind(this);
    this.handleInputSearch = this.handleInputSearch.bind(this);
    this.handleClickSearch = this.handleClickSearch.bind(this);
    this.handleSearchType = this.handleSearchType.bind(this);
  }

  handleInputPost(input, type) {
    let element = input.target.value;
    this.setState({[type]: element});
  }

  handleSearchType(input) {
    let element = input.target.value;
    this.setState({searchType: element});
  }

  handleInputSearch(input) {
    let element = input.target.value;
    this.setState({searchValue: element});
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
      .catch(err => {
        console.log(err);
        alert('There was an error submitting your hours');
      })
      document.getElementById('form-post').reset();
    }
  }

  handleClickSearch() {
    if(this.state.searchValue === '' && this.state.searchType !== 'all') {
      alert('You did not fill out the search box, please try again!');
    } else {
      axios.get('/hours')
      .then(({data}) => {
        this.setState({info: data});
        this.state.info = this.filterInfo(this.state.info, this.state.searchType, this.state.searchValue);
      })
      .catch(err => {
        console.log(err);
        alert('There was an error searching the database');
      })

    }
  }

  filterInfo(data, type, value) {
    if(type === 'date') {
      return data.filter(entry => {
        return entry.date === value;
      })
    }
  }

  render() {
    return (
      <div>
        <h1>Hack Reactor Hours</h1>
        <div>
          <Calculate />
        </div>
        <div>
          <Post handleInputPost={this.handleInputPost} handleClickPost={this.handleClickPost}/>
        </div>
        <div>
          <Search handleInputSearch={this.handleInputSearch} handleClickSearch={this.handleClickSearch} handleSearchType={this.handleSearchType} info={this.state.info}/>
        </div>
      </div>
    );
  }
}

export default App;