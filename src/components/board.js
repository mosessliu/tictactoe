import React from 'react';
import Block from './block.js';
import './board.css';

export default class Board extends React.Component {

  constructor(props) {
    super(props);
    // 12 colors for block color randomization
    this._colorArray = ["#8f77f4", "#ddb7f2", "#58217d", 
                        "#d3076d", "#afc5dd", "#14938f", 
                        "#ad7754", "#df9755", "#d15759", 
                        "#216b08", "#a4f5bf", "#a9a0bb"
                       ];

    this._DIMENSION = parseInt(this.props.boardSize, 10);
    this.selectBlock = this.selectBlock.bind(this);

    this.state = {
      blockStates: this.getDefaultBlockState(),
      canSelectBlock: true
    }
  }

  getDefaultBlockState() {
    const states = {};
    const dimension = this._DIMENSION;
    for (var i = 1; i <= dimension; i += 1) {
      states[i] = null;
    }
    return states;
  }

  createBlockRow(nums) {
    return nums.map(i => {
      const color = this.getRandomColor();
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

  getRandomColor() {
    const randomIndex = Math.floor(Math.random() * 12);
    return this._colorArray[randomIndex];
  }

  selectBlock(number) {
    if (this.blockIsMarked(number) || !this.state.canSelectBlock) {
      return;
    }

    const isPlayerOnesTurn = this.props.isPlayerOnesTurn;
    this.setState((prevState) => {
      var newBlockStates = prevState.blockStates;
      newBlockStates[number] = isPlayerOnesTurn ? 'X' : 'O';
    }, () => {
      this.updateGameState();
      this.updateHistory(number);
    });
  }

  blockIsMarked(number) {
    return this.state.blockStates[number];
  }

  updateGameState() {
    if (this.aPlayerDidWin()) {
      this.toggleBlockSelection();
      this.props.endGame();
    } else if (this.isCatsGame()) {
      this.props.catsGame();
    } else {
      this.props.switchTurn();
    }
  }

  updateHistory(block) {
    this.props.addToHistory(block);
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
    const marker = this.props.isPlayerOnesTurn ? 'X' : 'O';
    const rowOrColumnWin = this.checkRowsAndColumns(marker);
    const diagonalWin = this.checkDiagonals(marker);
    return rowOrColumnWin || diagonalWin;
  }

  checkRowsAndColumns(marker) {
    const dimension = this._DIMENSION;

    const numberOfBlocks = dimension * dimension;

    for (var i = 1; i <= numberOfBlocks; i += dimension) {
      const lastBlockNumberOfRow = i + dimension - 1;
      if (this.wonFromRow(i, lastBlockNumberOfRow, marker)) {
        return true;
      }
    }

    for (var j = 1; j <= dimension; j += 1) {
      const lastBlockOfColumn = j + ((dimension - 1) * dimension)
      if (this.wonFromColumn(j, lastBlockOfColumn, marker)) {
        return true;
      }
    }
    return false;
  }

  wonFromRow(start, end, marker) {
    const blockStates = this.state.blockStates;
    for (var j = start; j <= end; j += 1) {
      if (blockStates[j] !== marker) {
        return false;
      } 
    }
    return true;
  }

  wonFromColumn(start, end, marker) {
    const blockStates = this.state.blockStates;
    const dimension = this._DIMENSION;
    for (var j = start; j <= end; j += dimension) {
      if (blockStates[j] !== marker) {
        return false;
      }
    }
    return true;
  }

  checkDiagonals(marker) {
    return this.wonFromLeftTopToBottomRight(marker) || this.wonFromRightTopToBottomLeft(marker);
  }

  wonFromLeftTopToBottomRight(marker) {
    const dimension = this._DIMENSION;
    const numberOfBlocks = dimension * dimension;
    const blockStates = this.state.blockStates;

    for (var i = 1; i <= numberOfBlocks; i += (dimension + 1)) {
      if (blockStates[i] !== marker) {
        return false;
      }      
    }
    return true;
  }

  wonFromRightTopToBottomLeft(marker) {
    const dimension = this._DIMENSION;
    const numberOfBlocks = dimension * dimension;
    const blockStates = this.state.blockStates;

    for (var i = dimension; i <= numberOfBlocks; i += (dimension - 1)) {
      if (blockStates[i] !== marker) {
        return false;
      }      
    }
    return true;
  }

  isCatsGame() {
    const dimension = this._DIMENSION;
    const numberOfBlocks = dimension * dimension;
    for (var i = 1; i <= numberOfBlocks; i += 1) {
      if (this.state.blockStates[i] == null) {
        return false;
      }
    }
    return true;
  }

  toggleBlockSelection() {
    this.setState({canSelectBlock: false});
  }

  getBoard() {
    const dimension = this._DIMENSION;
    var blockNumber = 1;
    const board = [];
    for (var i = 0; i < dimension; i += 1) {
      const rowNumbers = [];
      for (var j = 0; j < dimension; j += 1) {
        rowNumbers.push(blockNumber);
        blockNumber += 1;
      }
      const rowBlocks = this.createBlockRow(rowNumbers);
      const key = `r${i}`
      board.push(<ul key={key}>{rowBlocks}</ul>)
    }
    return board;
  }

  render() {
    const board = this.getBoard();
    return (
      <div>
        {board}
      </div>
    );
  }
}