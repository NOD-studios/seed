(function (window, define, require) {
  'use strict';
  return define([
    'app',
    'env',

    'css!app/css/header'
  ], function(app, env) {
    app.component.Headers = can.Component.extend({
      tag      : 'header',
      template : can.view('app/mustache/header.mustache'),
      scope    : can.$.extend(true, env, {

      }),
      helpers: {
        classLoaded : function(options){
          if(options.context.attr('complete')) {
            return "class='loaded'";
          }
        }
      }
    });

    return app;
  });
}) (window, define, require);
