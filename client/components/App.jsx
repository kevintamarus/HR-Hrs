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
      calculateType: 'total',
      searchType: 'all',
      searchValue: '',
      display: '',
    };
    this.handleInputPost = this.handleInputPost.bind(this);
    this.handleClickPost = this.handleClickPost.bind(this);
    this.handleInputSearch = this.handleInputSearch.bind(this);
    this.handleClickSearch = this.handleClickSearch.bind(this);
    this.handleSearchType = this.handleSearchType.bind(this);
    this.handleCalculateType = this.handleCalculateType.bind(this);
    this.handleClickCalculate = this.handleClickCalculate.bind(this);
  }

  handleInputPost(input, type) {
    let element = input.target.value;
    this.setState({[type]: element});
  }

  handleCalculateType(input) {
    let element = input.target.value;
    this.setState({calculateType: element});
  }

  handleSearchType(input) {
    let element = input.target.value;
    this.setState({searchType: element});
  }

  handleInputSearch(input) {
    let element = input.target.value;
    this.setState({searchValue: element});
  }

  handleClickCalculate() {
    axios.get('/hours')
      .then(({data}) => {
        let message = '';
        if(this.state.calculateType === 'total') {
          message = `You spent a grand total of ${this.totalHours(data)} hours at Hack Reactor!!!`;
        } else if(this.state.calculateType === 'average') {
          message = this.hrsPerWeek(data);
        }
        this.setState({display: message});
      })
      .catch(err => {
        console.log(err);
        alert('There was an error searching the database');
      })
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
      this.setState({date: ''});
      this.setState({date: ''});
      this.setState({date: ''});
    }
  }

  handleClickSearch(input) {
    input.preventDefault();
    if(this.state.searchValue === '' && this.state.searchType !== 'all') {
      alert('You did not fill out the search box, please try again!');
    } else {
      axios.get('/hours')
      .then(({data}) => {
        let filteredData = this.filterInfo(data, this.state.searchType, this.state.searchValue);
        this.setState({info: filteredData});
      })
      .catch(err => {
        console.log(err);
        alert('There was an error searching the database');
      })
    }
  }

  filterInfo(data, type, value) {
    //search by date
    if(type === 'date') {
      return data.filter(entry => {
        return entry.date.toLowerCase() === value.toLowerCase();
      })
    }
    //search by less-than value
    else if (type === 'less') {
      return data.filter(entry => {
        return (this.timeDifference(entry.arrived, entry.left)) < parseInt(value);
      })
    }
    //search by greater-than value
    else if (type === 'more') {
      return data.filter(entry => {
        return (this.timeDifference(entry.arrived, entry.left)) > parseInt(value);
      })
    }
    else {
      return data;
    }
  }

  convertToArray(time) {
    let hour = '';
    let minute = '';
    let button = 1;
    for(let i=0; i<time.length; i++) {
      if (time[i] === ":" ) {
        button++;
      }
      else if (button === 1 && time[i]) {
        hour = hour + time[i];
      }
      else if (button === 2 && time[i]) {
        minute = minute + time[i];
      }
    }
    return [parseInt(hour), parseInt(minute)]
  }

  timeDifference(time1, time2) {
    let start = this.convertToArray(time1);
    let end = this.convertToArray(time2);
    let am = 12 - (start[0] + (start[1]/60))
    let pm = end[0] + (end[1]/60);
    return am+pm;
  }

  totalHours(data) {
    let totalHRtime = 0;
    data.forEach(entry => {
      totalHRtime += this.timeDifference(entry.arrived, entry.left); 
    })
    return totalHRtime;
  }

  hrsPerWeek(data) {
    let hours = ((this.totalHours(data)/data.length) * 6);
    let expression = `You spent on average ${hours} hours per week at Hack Reactor!!!`;
    if(hours > 75) {
      return expression + ' YOU HAVE NO LIFE!!!!!!!!!';
    } else {
      return expression;
    }
  }

  render() {
    return (
      <div>
        <h1 id="title">Hack Reactor Hours</h1>
        <div id="calculate">
          <Calculate handleCalculateType={this.handleCalculateType} handleClickCalculate={this.handleClickCalculate} display={this.state.display}/>
        </div>
        <div id="post">
          <Post handleInputPost={this.handleInputPost} handleClickPost={this.handleClickPost}/>
        </div>
        <div id="search">
          <Search handleInputSearch={this.handleInputSearch} handleClickSearch={this.handleClickSearch} handleSearchType={this.handleSearchType} info={this.state.info}/>
        </div>
      </div>
    );
  }
}

export default App;