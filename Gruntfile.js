module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json')
  });

  grunt.loadNpmTasks('grunt-env');

  grunt.registerTask('default', ['env']);
};
