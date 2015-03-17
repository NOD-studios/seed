(function (window, require, define) {
  'use strict';
  return define([
    'app',
    
    'webfontloader'
  ], function(app) {
    app.font = {
      name             : 'app/font',
      selectorElement  : '.app',
      load             : function(config) {
        return WebFont.load(config);
      }
    };
    return app;
  });
}) (window, require, define);
