import React from 'react';
import Board from './board';
import History from './history';
import BoardSetting from './setting';
import './game.css';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasEnteredBoardSize: false,
      boardSize: 0,
      isPlayerOnesTurn: true, 
      gameIsActive: true,
      isCatsGame: false,
      history: []
    }; 
    this.enterBoardSize = this.enterBoardSize.bind(this);
    this.switchTurn = this.switchTurn.bind(this);
    this.endGame = this.endGame.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.catsGame = this.catsGame.bind(this);
    this.addToHistory = this.addToHistory.bind(this);
    this.revertToMove = this.revertToMove.bind(this);
  }

  enterBoardSize(size) {
    this.setState( {hasEnteredBoardSize: true, boardSize: size} );
  }

  switchTurn() {
    this.setState(prevState => { 
      return { isPlayerOnesTurn: !prevState.isPlayerOnesTurn }
    });
  }

  addToHistory(block) {
    this.setState(prevState => {
      const history = prevState.history;
      history.push(block);
      return { history: history };
    })
  }

  revertToMove(moveNumber) {
    var history = this.state.history;
    var blocksData = this._board.state.blocksData;

    while (history.length > moveNumber) {
      const popped_id = history.pop();
      blocksData[popped_id].ownedBy = null;
    }
    this.setState({ 
      history: history, 
      isPlayerOnesTurn: (moveNumber % 2 === 0),
      gameIsActive: true });
    this._board.setState({ blocksData: blocksData});
  }

  endGame() {
    this.setState({ gameIsActive: false });
  }

  resetGame() {
    this.setState({ 
      hasEnteredBoardSize: false,
      isPlayerOnesTurn: true,
      gameIsActive: true, 
      isCatsGame: false, 
      history: []});
  }

  catsGame() {
    this.setState({isCatsGame: true})
  }

  generateMessage() {
    if (this.state.isCatsGame) {
      return 'Cats Game!'
    }

    if (this.state.gameIsActive) {
      return `It is player ${this.state.isPlayerOnesTurn ? 'one' : 'two'}'s turn!`;
    } else {
      return `Player ${this.state.isPlayerOnesTurn ? 'one' : 'two'} won!`;
    }
  }

  render() {
    const self = this;

    if (this.state.hasEnteredBoardSize) {
      return (
        <div>
          <div className="title">
            Tic Tac Toe!
          </div>
          <div className="message">
            {this.generateMessage()}
          </div>
          <Board 
            ref={(board) => self._board = board}
            boardSize={this.state.boardSize}
            isPlayerOnesTurn={this.state.isPlayerOnesTurn}
            switchTurn={this.switchTurn}
            endGame={this.endGame}
            catsGame={this.catsGame}
            addToHistory={this.addToHistory}
          />
          <button onClick={this.resetGame}>Reset Game</button>
          <History 
            history={this.state.history}
            revertToMove={this.revertToMove}
          />
        </div>
      );
    } else {
      return (
        <div>
           <div className="title">
            Tic Tac Toe!
          </div>
          <div className="message-before-start">
            Enter a board size:
          </div>
          <BoardSetting 
            hasEnteredBoardSize={this.state.hasEnteredBoardSize}
            enterBoardSize={this.enterBoardSize}
          /> 
        </div>
      );
    }    
  }
}