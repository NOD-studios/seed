(function (window) {
  'use strict';
  define([
    'jquery',
    'can/can',

    'can/util/library',
    'can/util/string',
    'css!app/css/app'
  ], function ($, can) {
    var app = app || {
      name            : 'app',
      selectorElement : '.app',
      config          : window.AppConfig,
      log             : function () {
        if (window.noLog) {
          return false;
        }
        if (!window.console) {
          return false;
        }
        return window.console.log.apply(window.console, arguments);
      },
      get            : function (appModuleName) {
        var appModule = app[appModuleName] || false;
        if (appModule && appModule.name && appModule.selectorElement) {
          var $moduleElement = $(appModule.selectorElement);
          app.log(can.sub("{name} loaded and attached to {selector} {count} time{s}. \
          ", {
            s        : $moduleElement.length > 1 ? 's' : '',
            name     : appModule.name,
            count    : $moduleElement.length,
            selector : appModule.selectorElement,
          }));
          return appModule;
        }
        return false;
      },
      load            : function (appModuleName, appLoadCallback) {
        if (typeof appModuleName !== 'string') {
          return false;
        }

        var self = this;
        return require([can.sub('app/{appModuleName}', {
          'appModuleName' : appModuleName
        })], function (app) {
          if (typeof appLoadCallback !== 'function') {
            appLoadCallback = self.appLoadCallback;
          }
          return self.appLoadCallback(appModuleName);
        });
      },
      loaded          : function ($element) {
        $element = $($element);
        if (!$element.length) {
          return false;
        }
        return $element
          .addClass('loaded')
          .addClass('loading');
      },
      appLoadCallback : function (appModuleName) {
        var appModule = app.get(appModuleName);
        if (appModule === false) {
          app.log(can.sub('AppModule {appModuleName} could not loaded.', {
            appModuleName : appModuleName
          }));
          return true;
        }
        if (typeof app[appModuleName].init === 'function') {
          var returnInit = app[appModuleName].init();
          if (app[appModuleName].selectorElement !== 'undefined') {
            app.loaded(app[appModuleName].selectorElement);
          }
          return returnInit;
        }
        return true;
      },
      overflow        : function (toggle) {
        var self = this;
        toggle = toggle ? true : false;
        $(function() {
          $(self.selectorElement)
            .css('overflow', toggle ?
              'visible' : 'hidden');
        });
      },
      init            : function () {
        var self = this,
            $element;
        $element = $(self.selectorElement);
        if ($('.lt-ie9').length) {
          require(['respond']);
        }
        $.each(AppLoad, function (key, appModuleName) {
          return self.load(appModuleName);
        });
        this
          .loaded($element)
          .removeClass('no-js');
        return this;
      }
    };

    return app;
  });
}) (window);
