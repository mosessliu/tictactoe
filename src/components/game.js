import React from 'react';
import Board from './board'
import './game.css'

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      isPlayerOnesTurn: true, 
      gameIsActive: true,
      isCatsGame: false
    }; 
    this.switchTurn = this.switchTurn.bind(this);
    this.endGame = this.endGame.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.catsGame = this.catsGame.bind(this);
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
    this.setState({ gameIsActive: true, isCatsGame: false});
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
        <div className="description">
          {this.generateMessage()}
        </div>
        <Board 
          ref = { (board) => self._board = board }
          isPlayerOnesTurn = {this.state.isPlayerOnesTurn}
          switchTurn = {this.switchTurn}
          endGame = {this.endGame}
          catsGame = {this.catsGame}
        />
        <button onClick={this.resetGame}>Reset Game</button>
      </div>
    );
  }
}