import {Environment} from 'environment';
import {inject} from 'aurelia-dependency-injection';

//@jshint-ignore-start
@inject(Element, Environment)
//@jshint-ignore-end
export class Nod {
  //@jshint-ignore-start
  environment   = {};
  configuration = {};
  //@jshint-ignore-end
  constructor(element, environment) {
    // subscribe to the "bar" property's changes:
    this.element       = element;
    this.environment   = environment;
    this.configuration = environment.get();
  }
}
