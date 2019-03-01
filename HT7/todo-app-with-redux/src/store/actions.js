export const ADD_TODO = 'ADD_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const SAVE_TODO = 'SAVE_TODO';
export const TOGGLE_EDIT = 'TOGGLE_EDIT';
export const TOGGLE_COMPLETE = 'TOGGLE_COMPLETE';
export const TOGGLE_DETAILS = 'TOGGLE_DETAILS';

export function addTodo() {
  return {
    type: ADD_TODO,
  }
}

export function deleteTodo(id) {
  return {
    type: DELETE_TODO,
    id,
  }
}

export function saveTodo(id, summary, details) {
  return {
    type: SAVE_TODO,
    id,
    summary, 
    details,
  }
}

export function toggleEdit(id) {
  return {
    type: TOGGLE_EDIT,
    id,
  }
}

export function toggleComplete(id) {
  return {
    type: TOGGLE_COMPLETE,
    id,
  }
}

export function toggleDetails(id) {
  return {
    type: TOGGLE_DETAILS,
    id,
  }
}