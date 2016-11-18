import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';
import {
  store,
  history,
  App,
  AppIndex,
  Welcome,
  NotFound
} from '../index';

export const router = () => (

  <Provider store={ store }>

    <Router history={ history }>

      <Route path="/" component={ App }>

        <IndexRoute component={ AppIndex } />
        <Route path='/welcome' component={ Welcome } />
        <Route path="*" component={ NotFound } status={ 404 } />

      </Route>

    </Router>

  </Provider>

);

export default router;
