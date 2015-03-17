(function (window, require, define) {
  'use strict';
  return define([
    'app',

    'css!app/css/modal'
  ], function(app) {
    app.menu = {
      name : 'app/modal',
      init : function() {
        return this;
      }
    };
    return app;
  });
}) (window, require, define);
