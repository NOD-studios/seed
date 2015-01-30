(function(window) {
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
      get            : function(appModuleName) {
        var appModule = app[appModuleName] || false;
        if (appModule && appModule.name) {
          this.log(can
            .sub('{appModuleName} loaded.', {
              'appModuleName' : appModule.name
            }));
          return appModule;
        }
        return false;
      },
      load            : function(appModuleName, appLoadCallback) {
        if (typeof appModuleName !== 'string') {
          return false;
        }

        var self = this;
        return require([can.sub('app/{appModuleName}', {
          'appModuleName' : appModuleName
        })], function(app) {
          if (typeof appLoadCallback !== 'function') {
            appLoadCallback = self.appLoadCallback;
          }
          return self.appLoadCallback(appModuleName);
        });
      },
      appLoadCallback : function(appModuleName) {
        var appModule = app.get(appModuleName);
        if (appModule === false) {
          app.log(can
            .sub('AppModule {appModuleName} could not loaded.', {
              appModuleName : appModuleName
            }));
          return true;
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
        var self = this;
        $.each(AppLoad, function(key, appModuleName) {
          return self.load(appModuleName);
        });
        return this;
      }
    };
    return app;
  });
}) (window);
