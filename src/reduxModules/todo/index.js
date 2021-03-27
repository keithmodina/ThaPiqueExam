import Todo from './todo'
import { actionAddTodo, actionModifyTodo } from './actionTodo';

export const ADD_TODO = '[todo] ADD_TODO';
export const OPEN_ADD_PARENT_TODO = '[todo] OPEN_PARENT_TODO';
export const OPEN_ADD_SUBTASK_TODO = '[todo] OPEN_SUBTASK_TODO';
export const OPEN_EDIT_PARENT_TODO = '[todo] OPEN_EDIT_PARENT_TODO';
export const OPEN_EDIT_SUBTASK_TODO = '[todo] OPEN_EDIT_SUBTASK_TODO';
export const UPDATE_TODO = '[todo] UPDATE_TODO';

export {
  actionAddTodo,
  actionModifyTodo
};

export default Todo;