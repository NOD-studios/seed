import {inject} from 'aurelia-dependency-injection';

//@jshint-ignore-start
@inject(Element)
//@jshint-ignore-end
export class Environment {
  //@jshint-ignore-start
  configuration = {};
  //@jshint-ignore-end

  constructor(element) {
    this.set(element.dataset.environment);
  }

  set(configuration = false) {
    this.configuration = typeof configuration === 'string' ?
      JSON.parse(configuration) : configuration || {};

    return this.configuration;
  }

  get(key = false) {
    if (typeof key === 'string') {
      return this.getKey(key);
    }

    return this.configuration;
  }

  getKey(key = false) {
    if (typeof key !== 'string') {
      return false;
    }
    if (typeof this.configuration[key] === 'undefined') {
      return false;
    }
    return this.configuration[key];
  }

  setKey(key = false, value = null) {
    if (typeof key !== 'string') {
      return false;
    }
    this.configuration[key] = value;

    return this.configuration;
  }
}
