import { createStore, compose, applyMiddleware } from "redux";

// import the root reducer
import rootReducer from '../../reducers';

// import middlewares
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export default function configureStore(preloadedState) {
  const middlewares = [thunk];

  // only add logger middleware in develpopment environment
  if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
  }

  const middlewareEnhancer = applyMiddleware(...middlewares);

  // there is now enhancer yet, only middlewares
  const enhancers = [middlewareEnhancer];
  const composedEnhancers = compose(...enhancers);

  const store = createStore(rootReducer, preloadedState, composedEnhancers);

  return store
}

