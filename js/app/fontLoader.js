(function (window, require, define) {
  'use strict';
  return define([
    'app',

    'webfontloader'
  ], function(app) {
    app.fontLoader = {
      name             : 'app/fontLoader',
      selectorElement  : '.app',
      load             : function(config) {
        return WebFont.load(config);
      }
    };
    return app;
  });
}) (window, require, define);
