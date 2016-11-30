import {
  FETCH_IP,
  FETCH_IP_CANCELLED,
  FETCH_RESOLVE,
  FETCH_REJECT
} from '../index';

export const
  fetchIp = () => ({ type : FETCH_IP, fetching : true }),
  fetchIpCancelled = () => ({ type : FETCH_IP_CANCELLED, fetching : false }),
  fetchReject = error => ({ type : FETCH_REJECT, error, fetching : false }),
  fetchResolve = data => ({ type : FETCH_RESOLVE, data, fetching : false });
