import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';

export class Api {

  returnObservable = true;

  endpoint = 'https://httpbin.org';

  defaults = {
    mode : 'cors',
    cache : 'default',
    method : 'GET',
    headers : {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  };

  constructor(override = {}) {
    Object.assign(this, { ...override });
  }

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

  fetchObservable = (...params) => Observable::fromPromise(this.fetchPromise(...params));

  fetch = (...params) => this.returnObservable ?
    this.fetchObservable(...params) : this.fetchPromise(...params);

  post = (body = {}, url = `${this.endpoint}/post`) => this.fetch(url, {
    ...this.defaults,
    body : JSON.stringify(body),
    method : 'POST'
  });

  fetchIp = (url = `${this.endpoint}/ip`) => this.fetch(url);

}

export default Api;
