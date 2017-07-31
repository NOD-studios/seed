import { appReducer, appEpic, appHistory } from './'
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux'
import { createEpicMiddleware } from 'redux-observable'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { routerReducer } from 'react-router-redux'

const middlewares = [
  createEpicMiddleware(appEpic),
  routerMiddleware(appHistory)
]

export const appStore = createStore(
  combineReducers({
    app     : appReducer,
    routing : routerReducer
  }),
  compose(
    applyMiddleware(...middlewares),
    global.devToolsExtension ? global.devToolsExtension() : f => f
  )
)

export const syncHistory = syncHistoryWithStore(appHistory, appStore)

export default appStore
