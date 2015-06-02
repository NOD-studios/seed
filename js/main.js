(function (window, require) {
  'use strict';
  require.config({
    waitSeconds: 0,
    paths: {
      app: 'app',
      'app/model': 'app/control',
      'app/control': 'app/control',
      'app/css': '../css',
      'app/less': '../less',
      'app/font': '../font',
      'app/icon': '../icon',
      'app/render': '../render',
      'app/mustache': '../mustache',
      propertyParser: '../vendor/requirejs-plugins/src/propertyParser',
      lessc: '../vendor/less.js/dist/less.min',
      normalize: '../vendor/require-css/normalize',
      can: '../vendor/canjs/amd-dev/can',
      bootstrap: '../vendor/bootstrap/dist/js/bootstrap',
      canjs: '../vendor/canjs/can.jquery',
      jquery: '../vendor/jquery/dist/jquery',
      less: '../vendor/less.js/dist/less',
      css: '../vendor/require-css/css',
      'css-builder': '../vendor/require-css/css-builder',
      requirejs: '../vendor/requirejs/require',
      async: '../vendor/requirejs-plugins/src/async',
      depend: '../vendor/requirejs-plugins/src/depend',
      font: '../vendor/requirejs-plugins/src/font',
      goog: '../vendor/requirejs-plugins/src/goog',
      image: '../vendor/requirejs-plugins/src/image',
      json: '../vendor/requirejs-plugins/src/json',
      mdown: '../vendor/requirejs-plugins/src/mdown',
      noext: '../vendor/requirejs-plugins/src/noext',
      'Markdown.Converter': '../vendor/requirejs-plugins/lib/Markdown.Converter',
      text: '../vendor/requirejs-plugins/lib/text',
      respond: '../vendor/respond/dest/respond.src',
      webfontloader: '../vendor/webfontloader/webfontloader',
      html5shiv: '../vendor/html5shiv/dist/html5shiv',
      fleck: '../vendor/fleck/lib/fleck',
      'is-boolean': '../vendor/is-boolean/is-boolean'
    },
    shim: {
      facebook: {
        exports: 'FB'
      }
    },
    map: {
      '*': {
        font: 'font',
        text: 'text',
        less: 'less',
        css: 'css'
      }
    },
    packages: [
  
    ]
  });

  return require;
}) (window, window.require);
