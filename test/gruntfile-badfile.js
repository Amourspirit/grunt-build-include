// https://www.javacodegeeks.com/2015/02/testing-grunt-plugin-from-grunt.html
module.exports = function (grunt) {
  var loader = require("./grunt-hacks.js");
  grunt.initConfig({
    build_include: {
      default: {
        options: {
          expand: true,
        },
        src: './fixtures/badfile.txt',
        dest: '../scratch/test/badefile_replaces.txt'
      }
    }
  });
  grunt.loadTasks('./../tasks');
  grunt.registerTask('default', ['build_include:default']);
};