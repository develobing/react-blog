import axios from 'axios';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import {
  POST_LOADING_FAILURE,
  POST_LOADING_REQUEST,
  POST_WRITE_SUCCESS,
} from '../types';

// Load All Post
const loadPostApi = () => {
  return axios.get('/api/post');
};

function* loadPosts() {
  try {
    const result = yield call(loadPostApi);
    console.log('loadPosts - result ', result);

    yield put({
      type: POST_WRITE_SUCCESS,
      payload: result.data,
    });
  } catch (err) {
    yield put({
      type: POST_LOADING_FAILURE,
      payload: err,
    });

    push('/');
  }
}

function* watchLoadPosts() {
  yield takeEvery(POST_LOADING_REQUEST, loadPosts);
}

export default function* postSaga() {
  yield all([fork(watchLoadPosts)]);
}
