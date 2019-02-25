import React, { Component } from 'react';
import {Button} from './Button';


class Editor extends Component {
  state = {
    summary: this.props.data.summary,
    details: this.props.data.details,
  }
  onSummaryChange = (e) => {
    this.setState({summary: e.currentTarget.value});
  }
  onDetailsChange = (e) => {
    this.setState({details: e.currentTarget.value});
  }
  onSave = () => {
    const {id, made, detailedView} = this.props.data;
    const {summary, details} = this.state;
    const todoPoint = {
      id,
      made,
      edited: false,
      detailedView,
      summary,
      details,
    }
    this.props.onTodoPointChange('Save', todoPoint);
  };
  onCancel = () => {
    const {id, made, detailedView, summary, details} = this.props.data;
    const todoPoint = {
      id,
      made,
      edited: false,
      detailedView,
      summary,
      details,
    }
    this.props.onTodoPointChange('Cancel', todoPoint);
  };
  render() {
    const {summary, details} = this.state;
    return (
      <form className="editor">
          <input type="text" value={summary} className="summary" onChange={this.onSummaryChange} placeholder="Что нужно сделать?"/> 
          <textarea rows="3" value={details} className="details" onChange={this.onDetailsChange} placeholder="Детали"/>
          <Button name="Save" onClick={this.onSave}/>
          <Button name="Cancel" onClick={this.onCancel}/>
      </form>
    );
  }
}

export {Editor};
