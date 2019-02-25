import React, { Component } from 'react';


class Button extends Component {
  onClick = (e) => {
    e.preventDefault();
    const {name, onClick} = this.props;
    onClick(name);
  };
  render() {
    const {name} = this.props;
    return <button className={"btn" + name} onClick={this.onClick} > {name} </button>;
  }
}

export {Button};