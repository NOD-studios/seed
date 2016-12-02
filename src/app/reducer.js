import {
  CHANGE_FORM,

  POST_FORM,
  POST_FORM_CANCELLED,
  POST_FORM_RESOLVED,
  POST_FORM_REJECTED,

  FETCH_IP,
  FETCH_IP_CANCELLED,
  FETCH_IP_RESOLVED,
  FETCH_IP_REJECTED
} from '../index';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

export const appReducer = (state = {
  data : {},
  error : {},
  formError : {},
  fetchingIp : false,
  postingForm : false
}, action) => {

  const {
    type,
    data,
    error,
    formError,
    fetchingIp,
    postingForm
  } = action;

  switch(type) {

    case CHANGE_FORM:
      return { ...state, data };

    case POST_FORM_CANCELLED:
      return { ...state, postingForm };

      case POST_FORM:
      case POST_FORM_RESOLVED:
      return { ...state, data, postingForm };

    case POST_FORM_REJECTED:
      return { ...state, formError, postingForm };

    case FETCH_IP_CANCELLED:
    case FETCH_IP:
      return { ...state, fetchingIp };

    case FETCH_IP_REJECTED:
      return { ...state, error, fetchingIp };

    case FETCH_IP_RESOLVED:
      return { ...state, data, fetchingIp };

    default:
      return state;

  }

};

export const reducer = combineReducers({
  app : appReducer,
  routing : routerReducer
});

export default reducer;


