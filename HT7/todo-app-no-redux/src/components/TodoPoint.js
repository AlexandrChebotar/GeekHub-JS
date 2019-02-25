import React, { Component } from 'react';
import {Button} from './Button';
import {Editor} from './Editor.jsx';


class TodoPoint extends Component {
  onCheck = () => {
    this.props.onTodoPointChange('Made', this.props.data);
  };
  onClick = (actionType) => {
    this.props.onTodoPointChange(actionType, this.props.data);
  };
  render() {
    const {summary, details, made, edited, detailedView} = this.props.data;
    if (edited) {
      return <Editor data={this.props.data} onTodoPointChange={this.props.onTodoPointChange} />;
    } else {
      return (
        <div className={made ? "todoPoint made" : "todoPoint" }>
          <div className="summary" >
            <input type="checkbox" checked={made} onChange={this.onCheck} /> 
            {summary} 
          </div>
          {detailedView && <div className="details"> {details} </div>}
          <Button name="Details" onClick={this.onClick}/>
          <Button name="Edit" onClick={this.onClick} />
          <Button name="Delete" onClick={this.onClick}/>
        </div>
      );
    }
  }
}

export {TodoPoint};
