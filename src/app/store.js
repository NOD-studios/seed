import window from 'window-or-global';
import { reducer, rootEpic } from './index';
import { createEpicMiddleware } from 'redux-observable';
import { createStore, applyMiddleware, compose } from 'redux';

export const store = createStore(
  reducer,
  compose(
    applyMiddleware(createEpicMiddleware(rootEpic)),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

export default store;
