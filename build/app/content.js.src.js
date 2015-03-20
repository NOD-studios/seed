(function (window, require, define) {
  
  return define([
    'app',

    'css!app/css/content'
  ], function(app) {
    app.content = {
      name            : 'app/content',
      selectorElement : '.content',
      init            : function() {
        return this;
      }
    };
    return app;
  });
}) (window, require, define);
