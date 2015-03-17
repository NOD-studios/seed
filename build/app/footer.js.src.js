(function (window, require, define) {
  
  return define([
    'app',

    'css!app/css/footer'
  ], function(app) {
    app.footer = {
      name : 'app/footer',
      init : function() {
        return this;
      }
    };
    return app;
  });
}) (window, require, define);
