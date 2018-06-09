import React from 'react';
import Block from './block.js';
import './board.css';

export default class Board extends React.Component {

  constructor(props) {
    super(props);
    this._colorArray = ["#8f77f4", "#ddb7f2", "#58217d", 
                        "#d3076d", "#afc5dd", "#14938f", 
                        "#ad7754", "#df9755", "#d15759"
                       ];
    this.selectBlock = this.selectBlock.bind(this);
    const defaultBlockState = 
      {1: null, 2: null, 3: null, 
       4: null, 5: null, 6: null, 
       7: null, 8: null, 9: null
      };
    this.state = {
      blockStates: defaultBlockState,
      canSelectBlock: true
    }
  }

  createBlocks(nums) {
    return nums.map(i => {
      const color = this._colorArray[i - 1];
      return (
        <li key={i}>
          <Block 
            number={i} 
            color={color}
            selectBlock={this.selectBlock}
            marking={this.state.blockStates[i]}
          />
        </li>
      );
    });
  }

  selectBlock(number) {
    if (this.blockIsMarked(number) || !this.state.canSelectBlock) {
      return;
    }

    const isPlayerOnesTurn = this.props.isPlayerOnesTurn;
    this.setState((prevState) => {
      var newBlockStates = prevState.blockStates;
      newBlockStates[number] = isPlayerOnesTurn ? 'X' : 'O'
      return { blockStates: newBlockStates };
    }, this.updateGameState);
  }

  blockIsMarked(number) {
    return this.state.blockStates[number];
  }

  updateGameState() {
    if (this.aPlayerDidWin()) {
      this.toggleBlockSelection();
      this.props.endGame();
    } else {
      this.props.switchTurn();
    }
  }

  resetBoard() {
    const defaultBlockState = 
      { 1: null, 2: null, 3: null, 
        4: null, 5: null, 6: null, 
        7: null, 8: null, 9: null
      };
    this.setState({ blockStates: defaultBlockState, canSelectBlock: true });
  }

  aPlayerDidWin() {
    const marker = this.props.isPlayerOnesTurn ? "X" : "O";
    const winningConditions = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
      [1, 5, 9],
      [3, 5, 7]
    ];
    for (var i = 0; i < winningConditions.length; i += 1) {
      const condition = winningConditions[i];
      const didMatch = this.conditionMatches(condition, marker);
      if (didMatch) {
        return true;
      }
    }
    return false;
  }

  conditionMatches(condition, marker) {
    const blockStates = this.state.blockStates;
    for (var i = 0; i < condition.length; i += 1) {
      const key = condition[i];
      if (blockStates[key] !== marker) {
        return false;
      }
    }
    return true;
  }

  toggleBlockSelection() {
    this.setState({canSelectBlock: false});
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