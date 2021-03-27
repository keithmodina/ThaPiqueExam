import { render, fireEvent } from '@testing-library/react';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import App from './App';
import {
  actionAddTodo,
  actionModifyTodo
} from './reduxModules/todo';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const mockObj = {
  todoList: [{
    title: "test",
    key: "test",
    children: [],
    dueDate: "24 Mar",
    icon: []
  }],
  isOpenParentAddTodo: true,
  isOpenAddSubTask: false,
  isOpenParentEditTodo: false,
  isOpenEditSubTask: false
};

const getElement = (store, ownProps = {}) => (
  <Provider store={store}>
    <App {...ownProps} />
  </Provider>
);

describe('Todo App', () => {
  it('Should render todos', async () => {
    const store = mockStore(mockObj);
    const { getByTestId } = render(getElement(store));
    expect(getByTestId('todo-title')).toBeInTheDocument();
  });
  it('should open todo modal on click', async () => {
    const store = mockStore(mockObj);
    const mockActionAddTodo = (actionAddTodo, () => { });
    const mockActionModifyTodo = (actionModifyTodo, () => { });
    const { getByTestId } = render(getElement(store));
    fireEvent.click(getByTestId('add-todo-button'));
    fireEvent.click(getByTestId('modal-add-todo-button'));
    await (() => {
      expect(mockActionAddTodo).toHaveBeenCalled();
      expect(mockActionModifyTodo).toHaveBeenCalled();
    });
  });
});
