import React, { Component } from 'react';
import {TodoListContainer} from './containers/TodoListContainer';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <TodoListContainer />
      </div>
    );
  }
}

export default App;
