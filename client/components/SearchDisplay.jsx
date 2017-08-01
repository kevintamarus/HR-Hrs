import React from 'react';

const SearchDisplay = (props) => {
  return <div>
    <ul>
      {props.info.map((entry, index) => {
        return (
          <div key={index}>
            <span className="display-span">Date: {entry.date}</span>
            <span className="display-span">Time Arrived: {entry.arrived}</span>
            <span className="display-span">Time Left: {entry.left}</span>
          </div>
        )
      })}
    </ul>
  </div>
}

export default SearchDisplay;