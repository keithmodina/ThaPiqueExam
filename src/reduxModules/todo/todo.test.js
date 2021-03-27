import todo, { initialState as state } from './todo';
import {
    ADD_TODO,
    OPEN_ADD_PARENT_TODO,
    OPEN_ADD_SUBTASK_TODO,
    OPEN_EDIT_PARENT_TODO,
    OPEN_EDIT_SUBTASK_TODO,
  } from './index';


describe('todo reducer', () => {
  it('should return the initial state', () => {
    expect(todo(undefined)).toEqual(state);
  });

  it('should update the value of isOpenParentAddTodo to true', () => {
    expect(todo(undefined, {
      type: OPEN_ADD_PARENT_TODO,
      payload: true
    })).toEqual({
      ...state,
      isOpenParentAddTodo: true
    });
  });

  it('should update the value of isOpenAddSubTask to true', () => {
    expect(todo(undefined, {
      type: OPEN_ADD_SUBTASK_TODO,
      payload: true
    })).toEqual({
      ...state,
      isOpenAddSubTask: true
    });
  });

  it('should update the value of isOpenParentEditTodo to true', () => {
    expect(todo(undefined, {
      type: OPEN_EDIT_PARENT_TODO,
      payload: true
    })).toEqual({
      ...state,
      isOpenParentEditTodo: true
    });
  });

  it('should update the value of isOpenEditSubTask to true', () => {
    expect(todo(undefined, {
      type: OPEN_EDIT_SUBTASK_TODO,
      payload: true
    })).toEqual({
      ...state,
      isOpenEditSubTask: true
    });
  });

  it('should add data to todoList', () => {
    expect(todo(undefined, {
      type: ADD_TODO,
      payload: {
        title: 'test',
        key: 'test',
        dueDate: 'Mar 27',
        icon: []
      }
    })).toEqual({
      ...state,
      todoList: {
        title: 'test',
        key: 'test',
        dueDate: 'Mar 27',
        icon: []
      }
    });
  });
});
