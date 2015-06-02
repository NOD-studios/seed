(function (window) {
  'use strict';
  return define([
    'app',
    'env',
    'can/util/can',
    'is-boolean',
    'jquery',
    'fleck',

    'can/util/jquery',
    'can/util/library',
    'can/util/string',
    'can/model',
    'can/view/mustache',
    'can/control',

    'css!app/css/app'
  ], function (app, env, can, isBoolean, $, fleck) {
    can.Control.extend('app.Apps', {
      defaults     : {
        template : true,
        view     : true,
        model    : true,
        loaded   : true
      },
      path         : function(dir, name, ext) {
        name = name || this.options.name;
        ext  = ext ? '.' + ext : ext;
        return env.DIR_BASE + dir + '/' + name + ext;
      },
      spaceName    : function () {
        return this.fullName.replace('.' + this.name, '');
      },
      loadModel    : function (name, namespace) {
        var self = this;
        name = name || this.name;
        name = fleck.singularize(name).toLowerCase();
        var path = env.DIR_JS +
          '/' +
          this.spaceName() + '/' +
          env.DIR_MODEL;
        path = this.path(path, name, 'js');
        window.test = window.test || [];
        var test = can.import(path);
        window.test.push({
          d : test,
          n : path
        });
        return test;
      },
      loadControl  : function (name, namespace) {
        name = name || this.name;
        var path = env.DIR_JS +
          '/' +
          this.spaceName() +
          '/' +
          env.DIR_CONTROL;
          path = this.path(path, name, 'js');
        return can.import(path);
      },
      loadTemplate : function (data, name) {
        name     = name || this.name;
        name     = fleck.singularize(name).toLowerCase();
        var path = this.path(env.DIR_TEMPLATE, name, 'mustache');
        return can.view(path, data);
      }
    }, {
      log          : function () {
        if (isBoolean(window.ENV.DEBUG) !== true) {
          this.options.DEBUG = window.JSON
            .parse(window.ENV.DEBUG
              .toLowerCase());
        }
        if (this.options.DEBUG === false) {
          return false;
        }
        if (!window.console) {
          return false;
        }
        return window.console.log.apply(window.console, arguments);
      },
      loaded       : function (element) {
        element = element || this.element;
        if (!element || !element.length) {
          this.log('Element could not found for ' +
            this.options.name, element);
          return false;
        }
        element
          .addClass('loaded')
          .removeClass('loading');

        return this;
      },
      loadCallback : function (appModuleName) {
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
            var element = can.$(app[appModuleName].selectorElement);
            app[appModuleName].element = element;
            app.loaded(element);
          }
          return returnInit;
        }
        return true;
      },
      setup        : function (element, options) {
        options = can.extend(
          this.defaults,
          env,
          can.data(can.$(element)),
          options
        );
        var setup = can.Control.prototype.setup
          .apply(this, [element, options]);

        element = setup[0];
        options = setup[1];

        if (options.model !== false) {
          this.constructor.loadModel().done(function(model) {
            this.model = model;
          });
        }
        if (options.template !== false) {
          element.html(this.constructor.loadTemplate(this.options));
        }
        if (options.loaded !== false) {
          this.loaded();
        }
        element.removeClass('no-js');

        return setup;
      },
      init         : function (element, options) {
        var self = this;
        if (element.hasClass('.lt-ie9')) {
          require(['respond']);
        }
        app.Apps.loadControl('fonts')
          .done(function() {
            app.Apps.loadModel('deferred')
              .done(function() {
                new app.Fonts(element);
                app.Deferred.font
                  .always(function() {
                    self.loaded(self.element);
                    self.element.children('body')
                      .html(self.constructor.loadTemplate());
                  });
              });
          });
        return this;
      }
    });

    return app;
  });
}) (window);
