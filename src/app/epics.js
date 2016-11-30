import { FETCH_IP, FETCH_IP_CANCELLED } from './index';
import global from 'window-or-global';
import {
  Api,
  fetchResolve,
  fetchReject
} from '../index';
import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/fromPromise';
// import 'rxjs/add/observable/from';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/takeUntil';
// import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

const api = new Api();

export const

  fetchIpEpic = action$ => action$
    .ofType(FETCH_IP)
    .switchMap(action => api
      .fetchIp()
      .map(fetchResolve)
      .takeUntil(action$.ofType(FETCH_IP_CANCELLED))
      .catch(error => {
        global.console.warn(error);
        return Observable.of(fetchReject(new Error('Could not fetch client IP')));
      })),

  rootEpic = (action$, store) => combineEpics(fetchIpEpic)(action$, store)
    .do({ error : error => global.console.error(error) });

export default rootEpic;
