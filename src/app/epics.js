import global from 'window-or-global';
import {

  POST_FORM,
  POST_FORM_CANCELLED,

  FETCH_IP,
  FETCH_IP_CANCELLED

} from './index';
import {
  Api,
  fetchIpResolve,
  fetchIpReject,
  postFormResolve,
  postFormReject,
  redirect
} from '../index';
import { _do as doAfter } from 'rxjs/operator/do';
import { of } from 'rxjs/observable/of';
import { concat } from 'rxjs/observable/concat';
import { map } from 'rxjs/operator/map';
import { mergeMap } from 'rxjs/operator/mergeMap';
import { _catch as catchError } from 'rxjs/operator/catch';
import { switchMap } from 'rxjs/operator/switchMap';
import { takeUntil } from 'rxjs/operator/takeUntil';
import { Observable } from 'rxjs/Observable';
import { combineEpics } from 'redux-observable';

const api = new Api();

export const

  fetchIpEpic = action$ => action$
    .ofType(FETCH_IP)
      ::switchMap(action => api
      .fetchIp()
      ::map(fetchIpResolve)
      ::takeUntil(action$.ofType(FETCH_IP_CANCELLED))
      ::catchError(error => {
        global.console.warn(error);
        return Observable::of(fetchIpReject(new Error('Could not fetch client IP')));
      })),

  postFormEpic = action$ => action$
    .ofType(POST_FORM)
    ::switchMap(action => api
      .post(action.data)
      ::mergeMap(data => Observable::concat(
        Observable::of(postFormResolve(data.json)),
        Observable::of(redirect('/register/success'))
      ))
      ::takeUntil(action$.ofType(POST_FORM_CANCELLED))
      ::catchError(error => {
        global.console.warn(error);
        return Observable::of(postFormReject(new Error('Could not submit form')));
      })),

  rootEpic = (action$, store) => combineEpics(fetchIpEpic, postFormEpic)(action$, store)
    ::doAfter({ error : error => global.console.error(error) });

export default rootEpic;
