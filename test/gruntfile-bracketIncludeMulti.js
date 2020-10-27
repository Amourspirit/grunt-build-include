// https://www.javacodegeeks.com/2015/02/testing-grunt-plugin-from-grunt.html
module.exports = function (grunt) {
  var gLoad = require('./grunt.load.this');
  grunt.initConfig({
    build_include: {
      default: {
        options: {
          match: {
            kind: 'bracketIncludeMulti',
            path: './md/'
          },
          comment: {
            padleft: 0,
            type: 'singleAsterisk'
          },
          text: {
            indent: true
          }
        },
        src: './fixtures/includeBracketMulti.txt',
        dest: '../scratch/test/includeBracketMulti_replaced.txt'
      }
    }
  });
  gLoad(grunt);
  grunt.registerTask('default', ['build_include:default']);
};