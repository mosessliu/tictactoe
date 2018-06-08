import React from 'react';
import './block.css';

export default class Block extends React.Component {
  render() {
    const style = {
      backgroundColor: this.props.color
    }

    console.log(this.props.color);

    return <div className="block" style={style}>{this.props.number}</div>
  }
}