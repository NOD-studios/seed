(function (window) {
  'use strict';
  define([
    'app',
    'can/util/can',

    'jquery',
    'can/util/jquery',
    'can/construct'
  ], function (app, can) {
    can.Construct.extend('app.Deferred', {
      app  : new can.Deferred(),
      font : new can.Deferred()
    }, {});
    return app;
  });
}) (window);
