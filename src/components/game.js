import React from 'react';
import Board from './board';
import History from './history';
import './game.css';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      isPlayerOnesTurn: true, 
      gameIsActive: true,
      isCatsGame: false,
      history: []
    }; 
    this.switchTurn = this.switchTurn.bind(this);
    this.endGame = this.endGame.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.catsGame = this.catsGame.bind(this);
    this.addToHistory = this.addToHistory.bind(this);
    this.revertToMove = this.revertToMove.bind(this);
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
    var blockStates = this._board.state.blockStates;

    while (history.length > moveNumber) {
      const poppedBlock = history.pop();
      blockStates[poppedBlock] = null;
    }
    this.setState({ history: history, isPlayerOnesTurn: (moveNumber % 2 == 0) });
    this._board.setState({ blockStates: blockStates});
  }

  endGame() {
    this.setState({ gameIsActive: false });
  }

  resetGame() {
    this._board.resetBoard();
    this.setState({ 
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
    return (
      <div>
        <div className="title">
          Tic Tac Toe!
        </div>
        <div className="message">
          {this.generateMessage()}
        </div>
        <Board 
          ref = { (board) => self._board = board }
          isPlayerOnesTurn = {this.state.isPlayerOnesTurn}
          switchTurn = {this.switchTurn}
          endGame = {this.endGame}
          catsGame = {this.catsGame}
          addToHistory = {this.addToHistory}
        />
        <button onClick={this.resetGame}>Reset Game</button>
        <History 
          history={this.state.history}
          revertToMove={this.revertToMove}
        />
      </div>
    );
  }
}