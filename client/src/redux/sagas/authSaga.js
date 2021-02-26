import axios from 'axios';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
} from '../types';

// Login
const loginUserApi = (loginData) => {
  console.log('loginData', loginData);

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return axios.post('api/auth', loginData, config);
};

function* loginUser(action) {
  try {
    const result = yield call(loginUserApi, action.payload);
    console.log('result', result);

    yield put({
      type: LOGIN_SUCCESS,
      payload: result.data,
    });
  } catch (err) {
    console.log('err', err);

    yield put({
      type: LOGIN_FAILURE,
      payload: err.response,
    });
  }
}

function* watchLoginUser() {
  yield takeEvery(LOGIN_REQUEST, loginUser);
}

// Login
function* logout(action) {
  try {
    yield put({
      type: LOGOUT_SUCCESS,
    });
  } catch (err) {
    console.log('err', err);

    yield put({
      type: LOGOUT_FAILURE,
    });
  }
}

function* watchLogout() {
  yield takeEvery(LOGOUT_REQUEST, logout);
}

export default function* authSaga() {
  yield all([fork(watchLoginUser), fork(watchLogout)]);
}
