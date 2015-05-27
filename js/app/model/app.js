(function (window) {
  'use strict';
  define([
    'app',
    'env',
    'can/util/can',

    'can/model'
  ], function (app, env, can) {
    app.model.app = can.Model.extend('app.model.app', {
      
    }, {

    });
    return app;
  });
}) (window);
