import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; // Import Redux Thunk middleware
import loggerMiddleware from './loggerMiddleware';
import authorReducer from './reducers/authorReducer';
import bookReducer from './reducers/bookReducer';

const rootReducer = combineReducers({
  authors: authorReducer,
  books: bookReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk, loggerMiddleware));

export default store;