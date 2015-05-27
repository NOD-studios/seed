(function (window) {
  'use strict';
  return define([
    'app',
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
  ], function (app, can, isBoolean, $, fleck) {
    app.control.apps = can.Control.extend('app.control.apps', {
      defaults     : {
        template : true,
        view     : true,
        model    : true,
        loaded   : true
      },
      init         : function() {
        this.defaults.name      = this.name;
        this.defaults.fullName  = this.fullName;
        this.defaults.namespace = this.namespace;
        return can.Control.prototype.init.apply(this, arguments);
      },
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
      path         : function(dir, name, ext) {
        name = name || this.options.name;
        ext  = ext ? '.' + ext : ext;
        return this.options.DIR_BASE + dir + '/' + name + ext;
      },
      namespace    : function () {
        return this.options.fullName.replace('.' + this.options.name, '');
      },
      loadModel    : function (name, namespace) {
        var self = this;
        name = name || this.options.name;
        name = fleck.singularize(name);
        var path = this.options.DIR_JS +
          '/' +
          this.namespace() + '/' +
          this.options.DIR_MODEL;
        path = this.path(path, name, 'js');
        return can.import(path);
      },
      loadControl  : function (name, namespace) {
        name = name || this.options.name;
        var path = this.options.DIR_JS +
          '/' +
          this.namespace() +
          '/' +
          window.ENV.DIR_CONTROL;
          path = this.path(path, name, 'js');
        return can.import(path);
      },
      loadTemplate : function (data, name) {
        name     = name || this.options.name;
        name     = fleck.singularize(name);
        var path = this.path(this.options.DIR_TEMPLATE, name, 'mustache');
        return can.view(path, data);
      },
      setup        : function (element, options) {
        options = can.extend(
          this.defaults,
          window.ENV,
          can.data(can.$(element)),
          options
        );
        var setup = can.Control.prototype.setup
          .apply(this, [element, options]);

        element = setup[0];
        options = setup[1];

        if (options.model !== false) {
          this.loadModel().done(function(model) {
            this.model = model;
          });
        }
        if (options.template !== false) {
          element.html(this.loadTemplate(this.options));
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

        element.children('body')
          .append(this.loadTemplate());

        this.loadControl('fonts')
          .done(function() {
            self.loadModel('deferred')
              .done(function() {
                var fonts = new app.control.fonts(element);
                app.deferred.font
                  .always(function() {
                    self.loaded(self.element);
                  });
              });
          });
        return this;
      }
    });

    return app.apps;
  });
}) (window);
