(function (window) {
  'use strict';
  define([], function() {
    if (typeof window.ENV !== 'object') {
      window.ENV = {};
    }
    return window.ENV;
  });
}) (window);
