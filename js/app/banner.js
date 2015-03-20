(function (window, require, define) {
  'use strict';
  return define([
    'app',

    'css!app/css/banner'
  ], function(app) {
    app.banner = {
      name            : 'app/banner',
      selectorElement : '.banner',
      init            : function() {
        return this;
      }
    };
    return app;
  });
}) (window, require, define);
