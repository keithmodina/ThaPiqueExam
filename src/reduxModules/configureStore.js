import {
  createStore, applyMiddleware, compose
} from 'redux';
import { loadState } from './localStorage';
import thunk from 'redux-thunk';
import todo from './todo';

const persistedState = loadState();

const middlewares = applyMiddleware(thunk);
const composeEnhancers = (process.env.NODE_ENV === 'development') ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : compose;

const store = createStore(todo, persistedState, composeEnhancers(middlewares));

export default store;