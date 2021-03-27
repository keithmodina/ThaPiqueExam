import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
    actionModifyTodo
} from './actionTodo';
import {
    ADD_TODO,
    OPEN_ADD_PARENT_TODO,
    OPEN_ADD_SUBTASK_TODO,
    OPEN_EDIT_PARENT_TODO,
    OPEN_EDIT_SUBTASK_TODO,
  } from './index';
import todo, { initialState } from './todo';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('todo reducer', () => {
  it('should return the initial state', () => {
    expect(todo(undefined, undefined)).toEqual(initialState);
  });
});

describe('todo actions', () => {
  it('should open todo popup', () => {
    const store = mockStore(initialState);

    const expectedActions = [
      {
        type: OPEN_ADD_PARENT_TODO,
        payload: true
      }
    ];

    store.dispatch(actionModifyTodo({ type: OPEN_ADD_PARENT_TODO, payload: true }));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should open subtask todo', () => {
    const store = mockStore(initialState);

    const expectedActions = [
      {
        type: OPEN_ADD_SUBTASK_TODO,
        payload: true
      }
    ];

    store.dispatch(actionModifyTodo({ type: OPEN_ADD_SUBTASK_TODO, payload: true }));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should open edit todo', () => {
    const store = mockStore(initialState);

    const expectedActions = [
      {
        type: OPEN_EDIT_PARENT_TODO,
        payload: true
      }
    ];

    store.dispatch(actionModifyTodo({ type: OPEN_EDIT_PARENT_TODO, payload: true }));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should open subtask edit todo', () => {
    const store = mockStore(initialState);

    const expectedActions = [
      {
        type: OPEN_EDIT_SUBTASK_TODO,
        payload: true
      }
    ];

    store.dispatch(actionModifyTodo({ type: OPEN_EDIT_SUBTASK_TODO, payload: true }));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
