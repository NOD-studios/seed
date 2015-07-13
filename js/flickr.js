import {Nod} from 'nod';
import {Environment} from 'environment';
import {inject} from 'aurelia-dependency-injection';
import {HttpClient} from 'aurelia-http-client';

//@jshint-ignore-start
@inject(Element, Environment, HttpClient)
//@jshint-ignore-end
export class Flickr extends Nod {
  //@jshint-ignore-start
  heading = 'Flickr';
  images  = [];
  url     = 'http://api.flickr.com/services/feeds/photos_public.gne?tags=mountain&tagmode=any&format=json';
  //@jshint-ignore-end

  constructor(element, environment, http) {
    super(element, environment);
    this.element = element;
    this.environment = environment;
    this.http = http;
  }

  activate() {
    return this.http.jsonp(this.url)
      .then(response => {
        this.images = response.content.items;
      });
  }
}
