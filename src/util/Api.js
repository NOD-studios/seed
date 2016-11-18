export class Api {

  fetch(url, data) {
    return fetch(url, {
      ...data,
      mode : 'cors',
      cache : 'default',
      method : 'GET',
      headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }

        return Promise.reject({
          status: response.status, data
        });
      })
      .then(data => Promise.resolve(data))
      .catch(Promise.reject);
  }

  fetchIp(url = 'http://ip.jsontest.com/') {

    return this.fetch(url);

  }

}

export default Api;
