(function (window, define, require) {
  'use strict';
  return define([
    'app',
    'can/util/can',
    'webfontconfig',
    'webfontloader',

    'app/control/apps'
  ], function(app, can, WebFontConfig, WebFont) {
    app.control.fonts = app.control.apps.extend('app.control.fonts', {
      defaults : {
        loaded   : false,
        template : false,
        model    : false
      }
    }, {
      init      : function(element, options) {
        var self = this;
        WebFont.load(WebFontConfig);
        return this;
      }
    });
    return app;
  });
}) (window, define, require);
