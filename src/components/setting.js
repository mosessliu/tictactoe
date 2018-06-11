import React from 'react';
import './setting.css';

export default class BoardSetting extends React.Component {

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.state = {dimension: ""};
  }

  onClick() {
    const size = this._input.value;
    if (size !== "") {
      this.props.enterBoardSize(size);
    }
  }

  onInputChange() {
    const inputValue = this._input.value;
    this.setState({dimension: inputValue});
  }

  render() {
    return (
      <div>
        <input 
          ref={(input) => this._input = input}
          onChange={this.onInputChange} 
          maxLength={3} 
          type="number"
          min={1}
        />
        <span>X</span>
        <input 
          className="otherDimensionInput"
          ref={(input) => this._otherDimensionInput = input} 
          readOnly={true}
          value={this.state.dimension}
        />
        <button className="align-right" onClick={this.onClick}>
          Ok!
        </button>
      </div>
    );
  }
}
