(function (window, require, define) {
  'use strict';
  return define([
    'app',
    'css!app/css/banner'
  ], function(app) {
    app.banner = {
      name : 'app/banner',
      init : function() {}
    };
    return app;
  });
}) (window, require, define);
