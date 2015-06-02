(function (window, define, require) {
  'use strict';
  return define([
    'app',

    'app/control/footers'
  ], function(app) {
    app.Apps.extend('app.Footers', {}, {
      init : function(element, options) {
        return this;
      }
    });
    return app;
  });
}) (window, define, require);
