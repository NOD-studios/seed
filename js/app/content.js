(function(window, require, define) {
  'use strict';
  return define([
    'app',
    'css!app/css/content'
  ], function(app) {
    app.content = {
      name : 'app/content',
      init : function() {}
    };
    return app;
  });
}) (window, require, define);
