import {
  ADD_TODO,
  OPEN_ADD_PARENT_TODO,
  OPEN_ADD_SUBTASK_TODO,
  OPEN_EDIT_PARENT_TODO,
  OPEN_EDIT_SUBTASK_TODO,
  UPDATE_TODO
} from './index';

export const initialState = {
    todoList: [],
    isOpenParentAddTodo: false,
    isOpenAddSubTask: false,
    isOpenParentEditTodo: false,
    isOpenEditSubTask: false
};

const Todo = (state = initialState, action = {}) => {
  switch(action.type) {
    case ADD_TODO:
      return {
        ...state,
        todoList: action.payload
      };
    case UPDATE_TODO:
      return {
        ...state,
        todoList: action.payload
      };
    case OPEN_ADD_PARENT_TODO:
      return {
        ...state,
        isOpenParentAddTodo: action.payload
      };
    case OPEN_ADD_SUBTASK_TODO:
      return {
        ...state,
        isOpenAddSubTask: action.payload
      };
    case OPEN_EDIT_PARENT_TODO:
      return {
        ...state,
        isOpenParentEditTodo: action.payload
      };
    case OPEN_EDIT_SUBTASK_TODO:
      return {
        ...state,
        isOpenEditSubTask: action.payload
      };
    default:
      return state;
  };
};

export default Todo;