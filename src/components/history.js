import React from 'react';
import './history.css';

export default class History extends React.Component {
  render() {
    const history = this.props.history;
    const revertToMove = this.props.revertToMove;
    const historyItems = history.map( (item, index) => {
      const moveNumber = index + 1;
      return (
        <li key={item} className="historyItem" onClick={() => revertToMove(moveNumber)}>
          <div>
            Revert to move {index + 1}
          </div>
        </li>
      );
    })

    return <ul>{historyItems}</ul>;
  }
}