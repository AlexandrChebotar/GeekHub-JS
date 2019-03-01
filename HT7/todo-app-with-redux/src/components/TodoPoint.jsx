import React, { Component } from 'react';
import {Button} from './Button';

class TodoPoint extends Component {
  render() {
    const {data, onCheckBoxClick, onDetailsButtonClick, onEditButtonClick, onDeleteButtonClick} = this.props;
    const {summary, details, completed, detailed} = data;
    return (
      <div className={completed ? "todoPoint completed" : "todoPoint" }>
        <div className="summary" >
          <input type="checkbox" checked={completed} onChange={onCheckBoxClick} /> 
          {summary} 
        </div>
        {detailed && <div className="details"> {details} </div>}
        <Button name="Details" onClick={onDetailsButtonClick}/>
        <Button name="Edit" onClick={onEditButtonClick} />
        <Button name="Delete" onClick={onDeleteButtonClick}/>
      </div>
    );
  }
}

export {TodoPoint};
