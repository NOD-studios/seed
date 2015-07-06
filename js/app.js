import {inject} from 'aurelia-dependency-injection';
import {bindable} from 'aurelia-templating';
import {Nod} from 'nod';
import {Environment} from 'environment';
import 'bootstrap/css/bootstrap.css!';
import './app.css!';
import $ from 'bootstrap';

//@jshint-ignore-start

//@jshint-ignore-end
export class App extends Nod {
  //@jshint-ignore-start

  //@jshint-ignore-end

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
      },
      {
        nav      : true,
        title    :'Flickr',
        route    : 'flickr',
        moduleId : './flickr'
      },
      {
        nav      : true,
        title    :'Child Router',
        route    : 'child-router',
        moduleId : './child-router'
      }
    ]);

    this.router = router;
  }
}
