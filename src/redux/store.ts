import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import { loadState, saveState } from '../utils/localStorage';

import { rootReducer } from './reducers';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const localStorageState = loadState();

const setupStore = () => {
  if (process.env.NODE_ENV !== 'production') {
    return createStore(
      rootReducer,
      localStorageState,
      composeEnhancers(applyMiddleware(logger, thunk))
    );
  }
  return createStore(rootReducer, localStorageState, applyMiddleware(thunk));
};

const store = setupStore();

store.subscribe(() => {
  saveState({
    settings: store.getState().settings,
  });
});

export default store;
