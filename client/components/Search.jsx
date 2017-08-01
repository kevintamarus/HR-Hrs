import React from 'react';
import SearchDisplay from './SearchDisplay.jsx';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      info: [],
    }
  }
  render() {
    return (
      <div>
        <h2>Search Database:</h2>
        <img src="http://www.reactiongifs.com/r/ktpng.gif"/>
        <div>
          <select onChange={(input) => this.props.handleSearchType(input)}>
            <option value="all">Give Me All The Data</option>
            <option value="date">By Date</option>
            <option value="less">Hours Spent Less Than</option>
            <option value="more">Hours Spent More Than</option>
          </select>
          <input type="text" onChange={(input) => this.props.handleInputSearch(input)}/>
          <button onClick={this.props.handleClickSearch}>Search</button>
        </div>
        <div>
          <SearchDisplay info={this.props.info}/> 
        </div>
      </div>
    )
  }
}

export default Search;