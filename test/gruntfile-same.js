// https://www.javacodegeeks.com/2015/02/testing-grunt-plugin-from-grunt.html
module.exports = function (grunt) {
  var loader = require("./grunt-hacks.js");
  var gLoad = require('./grunt.load.this');
  grunt.initConfig({
    copy: {
      fix: {
        files: [{
          // cwd: 'lib/',
          src: './fixtures/sample01.js',
          dest: '../scratch/test/sample_inline.js'
          // expand: false
        },
        {
          src: './fixtures/style.min.css',
          dest: '../scratch/test/css/style.min.css'
        }],
      }
    },
    build_include: {
      default: {
        options: {
          expand: true,
        },
        src: '../scratch/test/sample_inline.js',
        dest: '../scratch/test/sample_inline.js'
      }
    }
  });
  // grunt.loadTasks('./../dist');
  gLoad(grunt);
  loader.loadParentNpmTasks(grunt, 'grunt-contrib-copy');
  grunt.registerTask('default', ['copy:fix','build_include:default']);
};