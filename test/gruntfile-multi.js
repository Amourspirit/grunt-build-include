// https://www.javacodegeeks.com/2015/02/testing-grunt-plugin-from-grunt.html
module.exports = function (grunt) {
  var loader = require("./grunt-hacks.js");

  grunt.initConfig({
    copy: {
      fix: {
        files: [{
          // cwd: 'lib/',
          src: './fixtures/simple.txt',
          dest: '../scratch/test/simple.txt'
          // expand: false
        },
        {
          src: './fixtures/replace1.txt',
          dest: '../scratch/test/replace1.txt'
        },
          {
            src: './fixtures/simple02.txt',
            dest: '../scratch/test/simple02.txt'
          }],
      }
    },
    build_include: {
      default: {
        options: {
          expand: true,
        },
        src: '../scratch/test/simple.txt',
        dest: '../scratch/test/simple_replaced.txt'
      }
    }
  });

  grunt.loadTasks('./../tasks');
  loader.loadParentNpmTasks(grunt, 'grunt-contrib-copy');

  grunt.registerTask('default', ['copy:fix', 'build_include:default']);

};