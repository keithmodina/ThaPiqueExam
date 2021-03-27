import { ADD_TODO } from './index';

export const actionAddTodo = data => dispatch => {
  dispatch({ type: ADD_TODO, payload: data });
};

export const actionModifyTodo = ({type, payload}) => dispatch => {
  dispatch({ type, payload });
};