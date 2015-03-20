(function (window, require, define) {
  'use strict';
  return define([
    'app',

    'css!app/css/modal'
  ], function(app) {
    app.modal = {
      name            : 'app/modal',
      selectorElement : '.modal',
      init            : function() {
        return this;
      }
    };
    return app;
  });
}) (window, require, define);
