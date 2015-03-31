(function (window, require) {
  'use strict';
  
  require.config({
    waitSeconds: 500,
    paths: {
      facebook: '//connect.facebook.net/en_US/all',
      propertyParser: '../vendor/requirejs-plugins/src/propertyParser',
      lessc: '../vendor/less.js/dist/less.min',
      normalize: '../vendor/require-css/normalize',
      'app/img': '../img',
      'app/css': 'app/../../css',
      'app/less': 'app/../../less',
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
      webfontloader: '../vendor/webfontloader/webfontloader'
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
}) (window, require);
