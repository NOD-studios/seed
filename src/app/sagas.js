import {
  FETCH_IP,
  FETCH_REJECT,
  FETCH_RESOLVE
} from './index';
import { Api } from '../index';
import { takeLatest } from 'redux-saga';
import { put, call, fork } from 'redux-saga/effects';

function* fetchIp(action) {

  const fetching = false;

  try {

    const
      api = new Api(),
      data = yield call([api, api.fetchIp]);

    yield put({ type : FETCH_RESOLVE, data, fetching });

  } catch (error) {

    console.error(error);
    yield put({ type : FETCH_REJECT, error : new Error('Could not fetch client IP'), fetching });

  }
}

function* watchFetch() {
  yield takeLatest(FETCH_IP, fetchIp);
}

export function* rootSaga() {
  yield fork(watchFetch);
}

export default rootSaga;
