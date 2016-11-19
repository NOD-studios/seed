import {
  FETCH_IP,
  FETCH_RESOLVE,
  FETCH_REJECT
} from '../index';

export const
  fetchIp = () => ({ type : FETCH_IP, fetching : true }),
  fetchReject = (error, fetching) => ({ type : FETCH_REJECT, error, fetching }),
  fetchResolve = (data, fetching) => ({ type : FETCH_RESOLVE, data, fetching });
