(function (window, require, define) {
  'use strict';
  return define([
    'app',

    'css!app/css/footer'
  ], function(app) {
    app.footer = {
      name            : 'app/footer',
      selectorElement : '.footer',
      init            : function() {
        return this;
      }
    };
    return app;
  });
}) (window, require, define);
