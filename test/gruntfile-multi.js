// https://www.javacodegeeks.com/2015/02/testing-grunt-plugin-from-grunt.html
module.exports = function (grunt) {
  var loader = require("./grunt-hacks.js");
  var gLoad = require('./grunt.load.this');
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
          match: 'buildIncludeSlash'
        },
        src: '../scratch/test/simple.txt',
        dest: '../scratch/test/simple_replaced.txt'
      }
    }
  });

  gLoad(grunt);
  loader.loadParentNpmTasks(grunt, 'grunt-contrib-copy');

  grunt.registerTask('default', ['copy:fix', 'build_include:default']);

};