(function(window, require, define) {
  'use strict';
  return define([
    'app',
    'css!font-riesling/stylesheet',
    'css!app/css/header'
  ], function(app) {
    app.header = {
      name : 'app/header'
    };
    return app;
  });
}) (window, require, define);
