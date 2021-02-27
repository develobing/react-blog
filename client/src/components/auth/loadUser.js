import store from '../../store';
import { USER_LOADING_REQUEST } from '../../redux/types';

const LoadUser = () => {
  try {
    store.dispatch({
      type: USER_LOADING_REQUEST,
      payload: localStorage.getItem('token'),
    });
  } catch (err) {
    console.log('err', err);
  }
};

export default LoadUser;
