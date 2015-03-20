(function (window, require, define) {
  'use strict';
  return define([
    'app',

    'css!app/css/form'
  ], function(app) {
    app.form = {
      name            : 'app/form',
      selectorElement : '.form',
      init            : function() {
        return this;
      }
    };
    return app;
  });
}) (window, require, define);
