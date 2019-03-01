import React, { Component } from 'react';


class Button extends Component {
  onClick = (e) => {
    e.preventDefault();
    this.props.onClick();
  };
  render() {
    const {name} = this.props;
    return <button className={"btn" + name} onClick={this.onClick} > {name} </button>;
  }
}

export {Button};