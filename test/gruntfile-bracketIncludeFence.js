// https://www.javacodegeeks.com/2015/02/testing-grunt-plugin-from-grunt.html
module.exports = function (grunt) {
  var gLoad = require('./grunt.load.this');
  grunt.initConfig({
    build_include: {
      default: {
        options: {
          match: {
            kind: 'bracketIncludeMulti',
            path: './fixtures/'
          },
          comment: {
            type: 'singleAsterisk'
          },
          text: {
            indent: true
          },
          fence: 'strict'
        },
        src: './fixtures/includeBracketFence.txt',
        dest: '../scratch/test/includeBracketFence_replaced.txt'
      }
    }
  });
  gLoad(grunt);
  grunt.registerTask('default', ['build_include:default']);
};