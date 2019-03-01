import { connect } from 'react-redux';
import {addTodo, deleteTodo, saveTodo, toggleEdit, toggleComplete, toggleDetails} from '../store/actions';
import {TodoList} from '../components/TodoList';

const mapStateToProps = (state) => {
  return {
    todoIdList: state.todoIdList,
    todos: state.todos,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddTodo: () => {
      dispatch(addTodo())
    },
    onDeleteTodo: (id) => {
      dispatch(deleteTodo(id))
    },
    onSaveTodo: (id, summary, details) => {
      dispatch(saveTodo(id, summary, details))
    },
    onToggleEdit: (id) => {
      dispatch(toggleEdit(id))
    },
    onToggleComplete: (id) => {
      dispatch(toggleComplete(id))
    },
    onToggleDetails: (id) => {
      dispatch(toggleDetails(id))
    },
  }
};

const TodoListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)

export {TodoListContainer};