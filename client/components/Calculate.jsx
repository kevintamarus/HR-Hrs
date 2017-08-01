import React from 'react';

class Calculate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      display: '',
    }
  }
  render() {
    return (
      <div>
        <h2>Calculate Here:</h2>
        <div>
          <select onChange={(input) => this.props.handleCalculateType(input)}>
            <option value="total">Total Hours at Hack Reactor</option>
            <option value="average">Average Hours Per Week</option>
          </select>
          <button onClick={this.props.handleClickCalculate}>Calculate</button>
        </div>
        <div className="calculate-display">{this.props.display}</div>
      </div>

    );
  }
}

export default Calculate;