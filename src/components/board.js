import React from 'react';
import Block from './block.js';
import './board.css';

export default class Board extends React.Component {

  constructor(props) {
    super(props);
    this._colorArray = ["#8f77f4", "#ddb7f2", "#58217d", "#d3076d", "#afc5dd", "#14938f", "#ad7754", "#df9755", "#d15759"];
  }

  createBlocks(nums) {
    return nums.map(i => {
      const color = this._colorArray[i - 1];
      return <li key={i}><Block number={i} color={color}/></li>
    });
  }

  render() {

    const firstRow = this.createBlocks([1, 2, 3]);
    const secondRow = this.createBlocks([4, 5, 6]);
    const thirdRow = this.createBlocks([7, 8, 9]);

    return (
      <div>
        <ul>{firstRow}</ul>
        <ul>{secondRow}</ul>
        <ul>{thirdRow}</ul>
      </div>
    );
  }
}