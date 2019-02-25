import React, { Component } from 'react';
import {Button} from './Button';
import {TodoPoint} from './TodoPoint';
import todoList from '../data/todoList';


class TodoList extends Component {
  state = {
    todoList: todoList,
  };
  onTodoPointChange = (actionType, todoPoint) => {
    const {todoList} = this.state;
    let newTodoList;
    switch (actionType) {
      case 'Add':
        const newId = Math.max(...todoList.map(item => item.id)) + 1;
        const newPoint = {
          id: newId,
          made: false,
          edited: true,
          detailedView: false,
          summary: "",
          details: "",
        };
        newTodoList = [newPoint, ...todoList];
        break;
      case 'Details':
        newTodoList = todoList.map(item => {
          if (item.id === todoPoint.id) {
            item.detailedView = !item.detailedView;
          }
          return item;
        })
        break;
      case 'Made':
        newTodoList = todoList.map(item => {
          if (item.id === todoPoint.id) {
            item.made = !item.made;
          }
          return item;
        })
        break;
      case 'Edit':
        newTodoList = todoList.map(item => {
          if (item.id === todoPoint.id) {
            item.edited = true;
          }
          return item;
        })
        break;
      case 'Save':
        if (todoPoint.summary === '') {
          newTodoList = todoList;
        } else {
          newTodoList = todoList.map(item => {
            if (item.id === todoPoint.id) {
              return todoPoint;
            }
            return item;
          })
        }
        break;
      case 'Cancel':
        if (todoPoint.summary !== '') {
          newTodoList = todoList.map(item => {
            if (item.id === todoPoint.id) {
              return todoPoint;
            }
            return item;
          })
          break;
        }
      case 'Delete':
        newTodoList = todoList.filter(item => {
          return item.id !== todoPoint.id;
        })
        break;
      default:
      throw new Error('Unexpected action type');
    }
    //debugger;
    this.setState({todoList: newTodoList});
  }
  renderList() {
    const {todoList} = this.state;
    let renderedList = [];
    if (todoList.length) {
      renderedList = todoList.map(item => (
      <TodoPoint key={item.id} data={item} onTodoPointChange={this.onTodoPointChange}/>
      )
    )}
    return renderedList;
  }
  render() {
    return (
      <React.Fragment>  
        <h1> TODO-list: </h1>
        <Button name="Add" onClick={() => this.onTodoPointChange('Add')} />
        {this.renderList()}
      </React.Fragment>
    );
  }
}

export {TodoList};
