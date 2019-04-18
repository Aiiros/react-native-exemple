import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/weather-reducer';

const loggingMiddleware = (store: Object) => (next: Function) => (action: Object) => {
  console.info('%cINFO:', 'color: yellow', `Dispatching a ${action.type} action with payload:`, action.payload);
  const result = next(action);
  console.info('%cNext State:', 'color: cyan', store.getState());
  return result;
};

const configureStore = (initialState: Object) => {
  const middleware = applyMiddleware(thunk, loggingMiddleware);

  return createStore(rootReducer, initialState, middleware);
};

export default configureStore;
