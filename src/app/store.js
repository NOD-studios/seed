import global from 'window-or-global';
import { reducer, rootEpic, history } from './index';
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux'
import { createEpicMiddleware } from 'redux-observable';
import { createStore, applyMiddleware, compose } from 'redux';

const middlewares = [createEpicMiddleware(rootEpic), routerMiddleware(history)];

export const store = createStore(
  reducer,
  compose(
    applyMiddleware(...middlewares),
    global.devToolsExtension ? global.devToolsExtension() : f => f
  )
);

syncHistoryWithStore(history, store);

export default store;
