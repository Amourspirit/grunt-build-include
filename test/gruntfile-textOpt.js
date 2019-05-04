// https://www.javacodegeeks.com/2015/02/testing-grunt-plugin-from-grunt.html
module.exports = function (grunt) {
  var loader = require("./grunt-hacks.js");

  grunt.initConfig({
    build_include: {
      default: {
        options: {
          expand: true,
        },
        src: './fixtures/textOpt.txt',
        dest: '../scratch/test/textOpt_replaced.txt'
      }
    }
  });

  grunt.loadTasks('./../tasks');
  // loader.loadParentNpmTasks(grunt, 'grunt-contrib-copy');

  grunt.registerTask('default', ['build_include:default']);

};