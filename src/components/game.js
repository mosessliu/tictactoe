import React from 'react';
import Board from './board'
import './game.css'

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      isPlayerOnesTurn: true, 
      gameIsActive: true
    }; 
    this.switchTurn = this.switchTurn.bind(this);
    this.endGame = this.endGame.bind(this);
    this.resetGame = this.resetGame.bind(this);
  }

  switchTurn() {
    this.setState(prevState => { 
      return { isPlayerOnesTurn: !prevState.isPlayerOnesTurn }
    });
  }

  endGame() {
    this.setState({ gameIsActive: false });
  }

  resetGame() {
    this._board.resetBoard();
    this.setState({ gameIsActive: true});
  }

  render() {
    const message = this.state.gameIsActive ? 
      `It is player ${this.state.isPlayerOnesTurn ? 'one' : 'two'}'s turn!` :
      `Player ${this.state.isPlayerOnesTurn ? 'one' : 'two'} won!`;
    const self = this;
    return (
      <div>
        <div className="title">
          Tic Tac Toe!
        </div>
        <div className="description">
          {message}
        </div>
        <Board 
          ref = { (board) => self._board = board }
          isPlayerOnesTurn = {this.state.isPlayerOnesTurn}
          switchTurn = {this.switchTurn}
          endGame = {this.endGame}
        />
        <button onClick={this.resetGame}>Reset Game</button>
      </div>
    );
  }
}