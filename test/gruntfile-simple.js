// https://www.javacodegeeks.com/2015/02/testing-grunt-plugin-from-grunt.html
module.exports = function (grunt) {
  var loader = require("./grunt-hacks.js");
  var gLoad = require('./grunt.load.this');
  grunt.initConfig({
    clean: {
      dirs: ['../scratch/test']
    },
    build_include: {
      default: {
        options: {
          expand: true,
        },
        src: './fixtures/simple.txt',
        dest: '../scratch/test/simple_replaced.txt'
      }
    }
  });

  // grunt.loadTasks('./../dist/commonjs');
  gLoad(grunt);
  // loader.loadParentNpmTasks(grunt, 'grunt-contrib-copy');
  // Cannot delete files outside the current working directory
  // loader.loadParentNpmTasks(grunt, 'grunt-contrib-clean');

  grunt.registerTask('default', ['build_include:default']);

};