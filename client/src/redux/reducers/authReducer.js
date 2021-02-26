import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  CLEAR_ERROR_REQUEST,
  CLEAR_ERROR_SUCCESS,
  CLEAR_ERROR_FAILURE,
} from '../types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  isLoading: false,
  user: null,
  userId: '',
  userName: '',
  userRole: '',
  errorMsg: '',
  successMsg: '',
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case LOGOUT_REQUEST:
      return {
        ...state,
        errorMsg: '',
        isLoading: true,
      };

    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        errorMsg: '',
        isAuthenticated: true,
        isLoading: false,
        userId: action.payload.user.id,
        userRole: action.payload.user.role,
        errorMsg: '',
      };

    case LOGIN_FAILURE:
    case LOGOUT_FAILURE:
      return {
        ...state,
        user: null,
        userId: null,
        isAuthenticated: false,
        isLoading: false,
        userRole: null,
        errorMsg: action.payload.data.msg,
      };

    case LOGOUT_SUCCESS:
      localStorage.removeItem('token');
      return {
        token: null,
        errorMsg: '',
        isAuthenticated: false,
        isLoading: false,
        user: null,
        userId: '',
        userRole: '',
        errorMsg: '',
      };

    case CLEAR_ERROR_REQUEST:
      return {
        ...state,
        errorMsg: null,
      };

    case CLEAR_ERROR_SUCCESS:
      return {
        ...state,
        errorMsg: null,
      };

    case CLEAR_ERROR_FAILURE:
      return {
        ...state,
        errorMsg: null,
      };

    default:
      return state;
  }
};

export default authReducer;
