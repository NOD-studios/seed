(function (window) {
  'use strict';
  define([], function() {
    if (typeof window.env !== 'object') {
      window.env = {};
    }
    return window.env;
  });
}) (window);
