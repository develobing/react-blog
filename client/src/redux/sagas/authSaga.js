import axios from 'axios';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  USER_LOADING_REQUEST,
  USER_LOADING_SUCCESS,
  USER_LOADING_FAILURE,
  CLEAR_ERROR_REQUEST,
  CLEAR_ERROR_SUCCESS,
  CLEAR_ERROR_FAILURE,
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

// Logout
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

// Register
const registerUserApi = (req) => {
  console.log('req', req);

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return axios.post('api/users', req, config);
};

function* registerUser(action) {
  try {
    const result = yield call(registerUserApi, action.payload);
    console.log('registerUser - result', result);

    yield put({
      type: REGISTER_SUCCESS,
      payload: result.data,
    });
  } catch (err) {
    console.log('err', err);

    yield put({
      type: REGISTER_FAILURE,
      payload: err.response,
    });
  }
}

function* watchRegisterUser() {
  yield takeEvery(REGISTER_REQUEST, registerUser);
}

// User Loading
const userLoadingApi = (token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (token) {
    config.headers['Authorization'] = token;
  }

  return axios.get('api/auth/user', config);
};

function* userLoading(action) {
  try {
    console.log('userLoading - action', action);
    const result = yield call(userLoadingApi, action.payload);
    console.log('result', result);

    yield put({
      type: USER_LOADING_SUCCESS,
      payload: result.data,
    });
  } catch (err) {
    console.log('err', err);

    yield put({
      type: USER_LOADING_FAILURE,
      payload: err.response,
    });
  }
}

function* watchUserLoading() {
  yield takeEvery(USER_LOADING_REQUEST, userLoading);
}

function* clearError(action) {
  try {
    yield put({
      type: CLEAR_ERROR_SUCCESS,
    });
  } catch (err) {
    console.log('err', err);

    yield put({
      type: CLEAR_ERROR_FAILURE,
    });
  }
}

function* watchClearError() {
  yield takeEvery(CLEAR_ERROR_REQUEST, clearError);
}

export default function* authSaga() {
  yield all([
    fork(watchLoginUser),
    fork(watchLogout),
    fork(watchUserLoading),
    fork(watchRegisterUser),
    fork(watchClearError),
  ]);
}
