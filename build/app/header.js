(function (window, require, define) {
  'use strict';
  return define([
    'app',

    'css!app/css/header'
  ], function(app) {
    app.header = {
      name            : 'app/header',
      selectorElement : '.header',
      init            : function() {
        return this;
      }
    };
    return app;
  });
}) (window, require, define);
