import {Nod} from 'nod';

export class ChildRouter extends Nod {
  //@jshint-ignore-start
  heading = 'Child Router';
  //@jshint-ignore-end

  configureRouter(config, router) {
    config.map([
      {
        route    : ['','welcome'],
        moduleId : './welcome',
        nav      : true,
        title    : 'Welcome'
      },
      {
        route    : 'flickr',
        moduleId : './flickr',
        nav      : true,
        title    : 'Flickr'
      },
      {
        route    : 'child-router',
        moduleId : './child-router',
        nav      : true,
        title    : 'Child Router'
      }
    ]);

    this.router = router;
  }
}
