import React from 'react';

class Calculate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      display: '',
    }
  }
  render() {
    let imageURL = './shawnDrost.jpg';
    return (
      <div>
        <h2>Calculate Your Hours:</h2>
        <div>
          <select onChange={(input) => this.props.handleCalculateType(input)}>
            <option value="total">Total Hours at Hack Reactor</option>
            <option value="average">Average Hours Per Week</option>
          </select>
          <button onClick={this.props.handleClickCalculate}>Calculate</button>
        </div>
        <div className="display-calculate">{this.props.display}</div>
      </div>

    );
  }
}

export default Calculate;