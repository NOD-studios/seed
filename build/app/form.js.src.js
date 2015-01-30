(function (window, require, define) {
  
  return define([
    'app',
    'css!app/css/form'
  ], function(app) {
    app.form = {
      name : 'app/form',
      init : function() {}
    };
    return app;
  });
}) (window, require, define);
