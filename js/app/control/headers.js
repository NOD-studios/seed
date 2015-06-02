(function (window, define, require) {
  'use strict';
  return define([
    'app',

    'app/control/apps'
  ], function(app) {
    app.Apps.extend('app.Headers', {}, {
      init : function(element, options) {
        return this;
      }
    });
    return app;
  });
}) (window, define, require);
