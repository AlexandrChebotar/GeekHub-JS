import React, { Component } from 'react';
import {Button} from './Button';
import {TodoPoint} from './TodoPoint';
import {Editor} from './Editor';

class TodoList extends Component {  
  onCanlcelButtonClick = (id, summary, onDeleteTodo, onToggleEdit) => {
    if (summary === '') {
      return () => onDeleteTodo(id);
    }
    return () => onToggleEdit(id);
  };
  renderList() {
    const {todoIdList, todos, onDeleteTodo, onSaveTodo, onToggleEdit, onToggleComplete, onToggleDetails} = this.props;
    let renderedList = [];
    if (todoIdList.length) {
      renderedList = todoIdList.map(item => {
        const data = todos[item]
        const {id, edited, summary} = data;
        if (edited) {
          return (
            <Editor 
              key={id} 
              data={data} 
              onSaveButtonClick={(summary, details) => onSaveTodo(id, summary, details)}
              onCancelButtonClick={this.onCanlcelButtonClick(id, summary, onDeleteTodo, onToggleEdit)} 
            />
          );
        }
        else {
          return (
            <TodoPoint 
              key={id} 
              data={data} 
              onCheckBoxClick={() => onToggleComplete(id)}
              onDetailsButtonClick={() => onToggleDetails(id)}
              onEditButtonClick={() => onToggleEdit(id)}
              onDeleteButtonClick={() => onDeleteTodo(id)}
            />
          );
        }
      }
    )}
    return renderedList;
  }

  render() {
    return (
      <React.Fragment>  
        <h1> TODO-list: </h1>
        <Button name="Add" onClick={this.props.onAddTodo} />
        {this.renderList()}

      </React.Fragment>
    );
  }
}

export {TodoList};
