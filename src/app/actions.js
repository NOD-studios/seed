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

import { push } from 'react-router-redux';

export const

  redirect = location => push(location),

  changeForm = data => ({ type : CHANGE_FORM, data }),

  postForm = data => ({ type : POST_FORM, data, postingForm : true }),
  postFormCancelled = () => ({ type : POST_FORM_CANCELLED, postingForm : false }),
  postFormResolve = data => ({ type : POST_FORM_RESOLVED, data, postingForm : false }),
  postFormReject = formError => ({ type : POST_FORM_REJECTED, formError, postingForm : false }),

  fetchIp = () => ({ type : FETCH_IP, fetchingIp : true }),
  fetchIpCancelled = () => ({ type : FETCH_IP_CANCELLED, fetchingIp : false }),
  fetchIpReject = error => ({ type : FETCH_IP_REJECTED, error, fetchingIp : false }),
  fetchIpResolve = data => ({ type : FETCH_IP_RESOLVED, data, fetchingIp : false });
