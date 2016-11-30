import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';

export class Api {

  returnObservable = true;

  defaults = {
    mode : 'cors',
    cache : 'default',
    method : 'GET',
    headers : {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  };

  fetchPromise = (url, data) => fetch(url, {
    ...this.defaults,
    ...data
  })
    .then(response => {
      if (response.ok) {
        return response;
      }

      throw Error({ response : response.status, ...response });
    })
    .then(response => response.json())
    .then(::Promise.resolve)
    .catch(::Promise.reject);

  fetch = (...params) => this
    .returnObservable ? Observable.fromPromise(this.fetchPromise(...params)) : this.fetchPromise(...params);


  fetchIp = (url = 'https://httpbin.org/ip') => this.fetch(url);

}

export default Api;
