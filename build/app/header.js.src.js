(function (window, require, define) {
  
  return define([
    'app',
    
    'css!app/css/header'
  ], function(app) {
    app.header = {
      name : 'app/header',
      init : function() {
        return this;
      }
    };
    return app;
  });
}) (window, require, define);
