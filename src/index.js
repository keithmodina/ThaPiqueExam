import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './reduxModules/configureStore';
import {saveState} from './reduxModules/localStorage';
import reportWebVitals from './reportWebVitals';

store.subscribe(() => {
  saveState({
    todoList:store.getState().todoList
  });
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
