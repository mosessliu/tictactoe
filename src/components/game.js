import React from 'react';
import Board from './board'
import './game.css'

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      isPlayerOnesTurn: true, 
      gameIsActive: true, 
    }; 
    this.switchTurn = this.switchTurn.bind(this);
    this.endGame = this.endGame.bind(this);
  }

  switchTurn() {
    this.setState(prevState => { 
      return { isPlayerOnesTurn: !prevState.isPlayerOnesTurn }
    });
  }

  endGame() {
    this.setState({ gameIsActive: false });
  }

  render() {
    const message = this.state.gameIsActive ? 
      `It is player ${this.state.isPlayerOnesTurn ? 'one' : 'two'}'s turn!` :
      `Player ${this.state.isPlayerOnesTurn ? 'one' : 'two'} won!`;

    return (
      <div>
        <div className="title">
          Tic Tac Toe!
        </div>
        <div className="description">
          {message}
        </div>
        <Board 
          isPlayerOnesTurn = {this.state.isPlayerOnesTurn}
          switchTurn = {this.switchTurn}
          endGame = {this.endGame}
        />
      </div>
    );
  }
}