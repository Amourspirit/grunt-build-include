// https://www.javacodegeeks.com/2015/02/testing-grunt-plugin-from-grunt.html
module.exports = function (grunt) {
  var loader = require("./grunt-hacks.js");
  var gLoad = require('./grunt.load.this');
  grunt.initConfig({
    copy: {
      fix: {
        files: [{
          src: './fixtures/style.min.css',
          dest: '../scratch/test/css/style.min.css'
        }],
      }
    },
    build_include: {
      default: {
        options: {
          breakstring: 100
        },
        src: './fixtures/gruntfile_breakstring_style.txt',
        dest: '../scratch/test/gruntfile_breakstring100_replaced.txt'
      }
    }
  });

  gLoad(grunt);
  loader.loadParentNpmTasks(grunt, 'grunt-contrib-copy');

  grunt.registerTask('default', ['copy:fix', 'build_include:default']);

};