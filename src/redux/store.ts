import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import { rootReducer } from './reducers';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const setupStore = () => {
  if (process.env.NODE_ENV !== 'production') {
    return createStore(
      rootReducer,
      composeEnhancers(applyMiddleware(logger, thunk))
    );
  }
  return createStore(rootReducer, applyMiddleware(thunk));
};

const store = setupStore();

export default store;
