import {
  FETCH_IP,
  FETCH_REJECT,
  FETCH_RESOLVE,
  FETCH_IP_CANCELLED
} from '../index';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

export const appReducer = (state = {
  data : {},
  error : {},
  fetching : false
}, action) => {

  const { type, data, error, fetching } = action;

  switch(type) {

    case FETCH_IP_CANCELLED:
    case FETCH_IP:
      return { ...state, fetching };

    case FETCH_REJECT:
      return { ...state, error, fetching };

    case FETCH_RESOLVE:
      return { ...state, data, fetching };

    default:
      return state;

  }

};

export const reducer = combineReducers({
  routing : routerReducer,
  app : appReducer
});

export default reducer;


