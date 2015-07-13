import {Nod} from 'nod';
import {computedFrom} from 'aurelia-binding';

export class Welcome extends Nod {
  //@jshint-ignore-start
  heading       = 'Welcome!';
  firstName     = 'John';
  lastName      = 'Doe';
  previousValue = this.fullName;
  //@jshint-ignore-end

  constructor(element, environment) {
    super(element, environment);
    this.element = element;
    this.environment = environment;
  }

  //Getters can't be observed with Object.observe, so they must be dirty checked.
  //However, if you tell Aurelia the dependencies, it no longer needs to dirty check the property.
  //To optimize by declaring the properties that this getter is computed from, uncomment the line below.
  //@computedFrom('firstName', 'lastName')
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  submit() {
    this.previousValue = this.fullName;
    alert(`Welcome, ${this.fullName}!`);
  }

  canDeactivate() {
    if (this.fullName !== this.previousValue) {
      return confirm('Are you sure you want to leave?');
    }
  }
}

export class UpperValueConverter {
  toView(value) {
    return value && value.toUpperCase();
  }
}
