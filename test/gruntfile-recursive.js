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
        },
        {
          src: './fixtures/replace1.txt',
          dest: '../scratch/test/replace1.txt'
        }],
      }
    },
    build_include: {
      default: {
        options: {
          expand: true,
        },
        src: './fixtures/recursive03.txt',
        dest: '../scratch/test/recursive03_replaced.txt'
      }
    }
  });

  gLoad(grunt);
  loader.loadParentNpmTasks(grunt, 'grunt-contrib-copy');

  grunt.registerTask('default', ['copy:fix', 'build_include:default']);

};