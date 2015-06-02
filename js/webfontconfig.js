(function (window) {
  'use strict';
  define([
    'app',
    'env',

    'app/control/apps'
  ], function (app, env) {
    if (typeof window.WebFontConfig !== 'object') {
      window.WebFontConfig = {};
    }

    var configAvailable = false;

    if (env.WF_MONOTYPE) {
      window.WebFontConfig.monotype = {
        projectId : env.WF_MONOTYPE,
        version   : env.ASSET_VERSION
      };
      configAvailable = true;
    }

    if (env.WF_GOOGLE) {
      window.WebFontConfig.google = env.WF_GOOGLE;
      configAvailable = true;
    }

    if (env.WF_GOOGLE) {
      window.WebFontConfig.google = {
        families : env.WF_GOOGLE
      };
      configAvailable = true;
    }

    if (env.WF_TYPEKIT_ID) {
      window.WebFontConfig.typekit = {
        id : env.WF_TYPEKIT_ID
      };
      configAvailable = true;
    }

    if (!configAvailable) {
      app.Apps
        .loadModel('deferred')
          .done(function() {
            app.Deferred.font.resolve(arguments);
          });
      return window.WebFontConfig;
    }

    window.WebFontConfig.loading  = function() {
      // console.log('loading');
    };
    window.WebFontConfig.active   = function() {
      return app.Apps
        .loadModel('deferred')
          .done(function() {
            app.Deferred.font.resolve(arguments);
          });
    };
    window.WebFontConfig.loaded   = function() {
      return app.Apps
        .loadModel('deferred')
          .done(function() {
            app.Deferred.font.resolve(arguments);
          });
    };
    window.WebFontConfig.inactive = function() {
      return app.Apps
        .loadModel('deferred')
          .done(function() {
            app.Deferred.font.reject(arguments);
          });
    };

    return window.WebFontConfig;
  });
}) (window);
