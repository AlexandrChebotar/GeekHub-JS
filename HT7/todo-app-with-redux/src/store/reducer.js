import {ADD_TODO, DELETE_TODO, SAVE_TODO, TOGGLE_EDIT, TOGGLE_COMPLETE, TOGGLE_DETAILS} from './actions';

const todoIdList = (state = [], action) => {
  switch (action.type) {
      case ADD_TODO:
        return [action.id, ...state];
      case DELETE_TODO:
        return state.filter(id => id !== action.id);
      default:
        return state;
  }
};

const todo = (state, action) => {
  switch (action.type) {
      case ADD_TODO:
        return {
          id: action.id,
          completed: false,
          edited: true,
          detailedView: false,
          summary: '',
          details: '',
        };
      case SAVE_TODO:
        if (action.summary) {
          return {
            ...state,
            edited: false,
            summary: action.summary,
            details: action.details,
          }; 
        }
        return state;      
      case TOGGLE_EDIT:
        return {
          ...state,
          edited: !state.edited,
        };      
      case TOGGLE_COMPLETE:
        return {
          ...state,
          completed: !state.completed,
        };      
      case TOGGLE_DETAILS:
        return {
          ...state,
          detailed: !state.detailed,
        };
      default:
        return state;
  }
};

const todos = (state = {}, action) => {
  switch (action.type) {
      case ADD_TODO:
        return {
            [action.id]: todo(state, action),
            ...state,
        };
      case DELETE_TODO:
        let newState = {...state};
        delete newState[action.id];
        return newState;
      case SAVE_TODO:
      case TOGGLE_EDIT:   
      case TOGGLE_COMPLETE:
      case TOGGLE_DETAILS:
        newState = {...state};
        newState[action.id] = todo(state[action.id], action);
        return newState;
      default:
        return state;
  }
};

const reducer = (state = {}, action) => {
  switch (action.type) {
      case ADD_TODO:
        const {todoIdList: idList} = state;
        if (!idList || !idList.length) {
          action.id = 1;
        } else {
          action.id = Math.max(...idList) + 1;
        }
        return {
          todoIdList: todoIdList(state.todoIdList, action),
          todos: todos(state.todos, action),
        };
      case DELETE_TODO:
      case SAVE_TODO:    
      case TOGGLE_EDIT:
      case TOGGLE_COMPLETE:
      case TOGGLE_DETAILS:
        return {
          todoIdList: todoIdList(state.todoIdList, action),
          todos: todos(state.todos, action),
        };
      default:
        return state;
  }
};

export {reducer};