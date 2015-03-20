(function (window, require, define) {
  'use strict';
  return define([
    'app',

    'css!app/css/menu'
  ], function(app) {
    app.menu = {
      name            : 'app/menu',
      selectorElement : '.menu',
      init            : function() {
        return this;
      }
    };
    return app;
  });
}) (window, require, define);
