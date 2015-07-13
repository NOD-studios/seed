import {inject} from 'aurelia-dependency-injection';
import {binding} from 'aurelia-templating';
import {Router} from 'aurelia-router';
import {Nod} from 'nod';
import {Environment} from 'environment';
import $ from 'bootstrap';
import 'bootstrap/css/bootstrap.css!';
import './app.css!';

//@jshint-ignore-start
@inject(Element, Environment, Router)
//@jshint-ignore-end
export class App extends Nod {
  //@jshint-ignore-start
  configuration = {};
  //@jshint-ignore-end
  constructor(element, environment, router) {
    super();
    this.element       = element;
    this.configuration = environment.get();
  }

  configureRouter(config, router) {
    config.title = this.configuration.INFO_NAME;
    config.options.root = this.configuration.DIR_BASE;
    config.options.pushState = true;

    config.map([
      {
        nav      : true,
        title    :'Welcome',
        route    : ['', 'welcome'],
        moduleId : './welcome'
      }, {
        nav      : true,
        title    :'Flickr',
        route    : 'flickr',
        moduleId : './flickr'
      }, {
        nav      : true,
        title    :'Child Router',
        route    : 'child-router',
        moduleId : './child-router'
      }
    ]);

    this.router = router;
  }
}
