(function(window, require, define) {
  'use strict';
  define([
    'jquery',
    'can/util/string',
    'css!normalize.css/normalize',
    'css!app/css/app'
  ], function($, can) {
    var app = app || {
      name            : 'app',
      log             : function() {
        if (window.noLog) {
          return false;
        }
        if (!window.console) {
          return false;
        }
        return window.console.log.apply(window.console, arguments);
      },
      test            : function(context) {
        if (context && context.name) {
          app.log(can
            .sub('AppModule {appModuleName} loaded.', {
              appModuleName : context.name
            }));
          return true;
        }
        return false;
      },
      load            : function(appModuleName, appLoadCallback) {
        if (typeof appModuleName !== 'string') {
          return false;
        }

        if (typeof appLoadCallback !== 'function') {
          appLoadCallback = this.appLoadCallback;
        }

        return require([can.sub('app/{appModuleName}', {
          appModuleName : appModuleName
        })], function(appModule) {
          return appLoadCallback(appModuleName, appModule);
        });
      },
      appLoadCallback : function(appModuleName, appModule) {
        if (app.test(appModule) !== true) {
          app.log(can
            .sub('AppModule {appModuleName} could not loaded.', {
              appModuleName : appModuleName
            }));
          return false;
        }

        if (typeof app[appModuleName].init === 'function') {
          return app[appModuleName].init();
        }

        return true;
      },
      init            : function() {
        if ($('.lt-ie9').length) {
          require(['respond']);
        }
        $.each(AppLoad, function(key, moduleName) {
          return app.load(moduleName);
        });
      }
    };
    return app;
  });
}) (window, window.require, window.define);
