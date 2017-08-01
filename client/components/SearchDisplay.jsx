import React from 'react';

class DisplayDiv extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      change: false,
    }
  }

  hover() {
    this.setState({
      change: !this.state.change
    })
  }

  render() {
    let style = {
      color: this.state.change ? '#003333' : '#191970',
      fontWeight: this.state.change ? 'bold' : 'normal',
      fontSize: this.state.change ? '125%' : '100%'
    }

    return (
      <div className="display-div" style={style}
      onMouseEnter={this.hover.bind(this)}
      onMouseLeave={this.hover.bind(this)}>
        <span className="display-span">Date: {this.props.entry.date}</span>
        <span className="display-span">Time Arrived: {this.props.entry.arrived}</span>
        <span className="display-span">Time Left: {this.props.entry.left}</span>
      </div>
    )
  }
}

const SearchDisplay = (props) => {
  return (
  <ul>
    {props.info.map((entry, key) =>
      <DisplayDiv entry={entry} key={key} />
    )}
  </ul>
  )
}

export default SearchDisplay;