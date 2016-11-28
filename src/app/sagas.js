import { FETCH_IP } from './index';
import {
  Api,
  fetchResolve,
  fetchReject
} from '../index';
import global from 'window-or-global';
import { takeLatest } from 'redux-saga';
import { put, call, fork } from 'redux-saga/effects';

export function* fetchIpSaga(action) {

  const fetching = false;

  try {

    const
      api = new Api(),
      data = yield call([api, api.fetchIp]);

    yield put(fetchResolve(data, fetching));

  } catch (error) {

    global.console.error(error);
    yield put(fetchReject(new Error('Could not fetch client IP'), fetching));

  }
}

export function* watchFetchSaga() {
  yield takeLatest(FETCH_IP, fetchIpSaga);
}

export function* rootSaga() {
  yield fork(watchFetchSaga);
}

export default rootSaga;
