import {
  POST_REGISTRATION_FORM,
  POST_REGISTRATION_FORM_CANCELED,

  FETCH_IP,
  FETCH_IP_CANCELED,

} from './'
import {
  log,
  Api,
  user,
  errorLog,
  redirect,
  // resolveFetchingOfMessages,
  resolveFetchingOfIp,
  rejectFetchingOfIp,
  resolvePostingOfRegistrationForm,
  rejectPostingOfRegistrationForm,
} from '../'
import { _do as doAfter } from 'rxjs/operator/do'
import { of } from 'rxjs/observable/of'
import { concat } from 'rxjs/observable/concat'
import { map } from 'rxjs/operator/map'
import { mergeMap } from 'rxjs/operator/mergeMap'
import { _catch as catchError } from 'rxjs/operator/catch'
import { switchMap } from 'rxjs/operator/switchMap'
import { takeUntil } from 'rxjs/operator/takeUntil'
import { Observable } from 'rxjs/Observable'
import { combineEpics } from 'redux-observable'

const api = new Api()

export const
  fetchIpEpic = action$ =>
    action$
      .ofType(FETCH_IP)
      ::switchMap(action =>
        api
          .fetchIp()
          ::map(resolveFetchingOfIp)
          ::takeUntil(action$.ofType(FETCH_IP_CANCELED))
          ::catchError(error =>
            [
              Observable::of(rejectFetchingOfIp(new Error('Could not fetch client IP'))),
              errorLog(error)
            ])),

  postRegistrationFormEpic = action$ =>
    action$
      .ofType(POST_REGISTRATION_FORM)
      ::doAfter(log)
      ::switchMap(({ registrationFormResult, ...data }) =>
        user
          .store( registrationFormResult )
          ::doAfter(log)
          ::mergeMap(() => Observable::concat(...[
            Observable::of(log(resolvePostingOfRegistrationForm({
              registrationFormResult, ...data
            }))),
            Observable::of(redirect('/register/success'))
          ]))
          ::takeUntil(action$.ofType(POST_REGISTRATION_FORM_CANCELED))
          ::catchError(error => [
            Observable::of(rejectPostingOfRegistrationForm(new Error('Could not submit form'))),
            errorLog(error),
          ])),
  // fetchUserEpic = action$ => action$
  //   .ofType(FETCH_USER)
  //     ::switchMap(action => api
  //     .fetchIp()
  //     ::map(resolveFetchingOfUser)
  //     ::takeUntil(action$.ofType(FETCH_IP_CANCELED))
  //     ::catchError(error => [
  //       Observable::of(rejectFetchingOfIp(new Error('Could not fetch client IP'))),
  //       errorLog(error)
  //     ])),
  // watchTodosEpic = action$ => action$
  //     .ofType(FETCH_MESSAGES)
  //     .merge(
  //       user //eslint-disable-line
  //         .watch()
  //         .catch( errorLog ))
  //     .map(messages => fetchMessagesResolve(todos)),
  // addMessageEpic = action$ => action$
  //   .ofType(POST_MESSAGE)
  //   .mergeMap(action =>
  //     message
  //       .store(action.payload)
  //       .ignoreElements()
  //       .takeUntil(action$.ofType('cancel requests'))
  //       .catch(errorLog)),
  appEpic = (action$, store) =>
    combineEpics(fetchIpEpic, postRegistrationFormEpic)(action$, store)
      ::doAfter({ error : errorLog })

export default appEpic
