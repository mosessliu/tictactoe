import React from 'react';
import './block.css';

export default class Block extends React.Component {
  constructor(props) {
    super(props);
    this._BLOCK = this.props.block;
    this.selectBlock = this.selectBlock.bind(this);
  }

  selectBlock() {
    this.props.selectBlock(this._BLOCK);
  }


  render() {
    const marking = this._BLOCK.ownedBy ? this._BLOCK.ownedBy : "_";
    // hide unmarked blocks by setting color = backgroundcolor of block
    const color = this._BLOCK.ownedBy ? "black" : this._BLOCK.color;
    const style = {
      backgroundColor: this._BLOCK.color,
      color: color
    }
    return (
      <div className="block" style={style} onClick={this.selectBlock}>
        <div>
          {marking} 
        </div>
      </div>
    );
  }
}