import React, { Component } from 'react';
import {Button} from './Button';


class Editor extends Component {
  state = {
    summary: this.props.value,
    details: this.props.details,
  }
  onSummaryChange = (e) => {
    this.setState({summary: e.currentTarget.value});
  }
  onDetailsChange = (e) => {
    this.setState({details: e.currentTarget.value});
  }
  render() {
    const {summary, details} = this.state.data;
    const {onClick} = this.props;
    return (
      <form className="editor">
          <input type="text" value={summary} className="summary" onChange={this.onSummaryChange} /> 
          <input rows="3" value={details} className="details" onChange={this.onDetailsChange} /> 
          <Button name="Save" onClick={onClick}/>
          <Button name="Cancel" onclick={onClick}/>
      </form>
    );
  }
}

export {Editor};
