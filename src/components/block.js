import React from 'react';
import './block.css';

export default class Block extends React.Component {
  constructor(props) {
    super(props);
    this.setState = {owner: " "};
    this.selectBlock = this.selectBlock.bind(this);
  }

  selectBlock() {
    const number = this.props.number;
    this.props.selectBlock(number);
  }


  render() {
    const marking = this.props.marking ? this.props.marking : "_";
    // hide unmarked blocks by setting color = backgroundcolor of block
    const color = this.props.marking ? "black" : this.props.color;
    const style = {
      backgroundColor: this.props.color,
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