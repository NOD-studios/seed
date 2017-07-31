import React from 'react'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'
import {
  appStore,
  appHistory,
  App,
  AppIndex,
  Welcome,
  NotFound,
  Register,
  Success
} from '../index'

export const appRouter = () => (

  <Provider store={ appStore }>

    <Router history={ appHistory }>

      <Route path="/" component={ App }>

        <IndexRoute component={ AppIndex } />
        <Route path='/welcome' component={ Welcome } />
        <Route path='/register' component={ Register } />
        <Route path='/register/success' component={ Success } />
        <Route path="*" component={ NotFound } status={ 404 } />

      </Route>

    </Router>

  </Provider>

)

export default appRouter
