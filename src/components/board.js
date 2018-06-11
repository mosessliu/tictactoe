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
      blocksData: this.initBlocksData(),
      canSelectBlock: true
    }
  }

  initBlocksData() {
    const blocks = {}
    const dimension = this._DIMENSION;
    const numberOfBlocks = dimension * dimension;
    for (var i = 1; i <= numberOfBlocks; i += 1) {
      const block = {
        id: i,
        color: this.getRandomColor(),
        ownedBy: null
      }
      blocks[i] = block;
    }
    return blocks;
  }

  createBlockRow(nums) {
    return nums.map(i => {
      const block = this.state.blocksData[i];
      return (
        <li key={i}>
          <Block 
            block={block}
            selectBlock={this.selectBlock}
          />
        </li>
      );
    });
  }

  getRandomColor() {
    const randomIndex = Math.floor(Math.random() * 12);
    return this._colorArray[randomIndex];
  }

  selectBlock(block) {
    if (block.ownedBy || !this.state.canSelectBlock) {
      return;
    }
    const id = block.id;
    const isPlayerOnesTurn = this.props.isPlayerOnesTurn;
    this.setState((prevState) => {
      const marker = isPlayerOnesTurn ? 'X' : 'O';
      prevState.blocksData[id].ownedBy = marker;
    }, () => {
      this.updateGameState();
      this.updateHistory(id);
    });
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

  updateHistory(block_id) {
    this.props.addToHistory(block_id);
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
    const blocksData = this.state.blocksData;
    for (var j = start; j <= end; j += 1) {
      if (blocksData[j].ownedBy !== marker) {
        return false;
      } 
    }
    return true;
  }

  wonFromColumn(start, end, marker) {
    const blocksData = this.state.blocksData;
    const dimension = this._DIMENSION;
    for (var j = start; j <= end; j += dimension) {
      if (blocksData[j].ownedBy !== marker) {
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
    const blocksData = this.state.blocksData;

    for (var i = 1; i <= numberOfBlocks; i += (dimension + 1)) {
      if (blocksData[i].ownedBy !== marker) {
        return false;
      }      
    }
    return true;
  }

  wonFromRightTopToBottomLeft(marker) {
    const dimension = this._DIMENSION;
    const numberOfBlocks = dimension * dimension;
    const blocksData = this.state.blocksData;

    for (var i = dimension; i <= numberOfBlocks; i += (dimension - 1)) {
      if (blocksData[i].ownedBy !== marker) {
        return false;
      }      
    }
    return true;
  }

  isCatsGame() {
    const dimension = this._DIMENSION;
    const numberOfBlocks = dimension * dimension;
    for (var i = 1; i <= numberOfBlocks; i += 1) {
      if (this.state.blocksData[i].ownedBy == null) {
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