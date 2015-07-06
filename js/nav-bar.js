import {Nod} from 'nod';
import {bindable} from 'aurelia-framework';

export class NavBar extends Nod {

  activate(a, b) {
    console.log(a, b, this);
  }
  //@jshint-ignore-start
  @bindable router = null;
  //@jshint-ignore-end
}
