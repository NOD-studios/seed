(function (window, define, require) {
  'use strict';
  return define([
    'app',
    'env',
    'can/util/can',

    'can/component',

    'css!app/css/header'
  ], function(app, env, can) {
    app.component.Apps = can.Component.extend('app.component.Apps', {
      tag      : 'body',
      template : can.view('app/mustache/app.mustache'),
      scope: can.$.extend(true, env, {

      }),
      helpers: {
        classLoaded : function(options) {
          if(options.context.attr('complete')) {
            return "class='loaded'";
          }
        }
      }
    });

    return app;
  });
}) (window, define, require);
