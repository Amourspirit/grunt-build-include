// https://www.javacodegeeks.com/2015/02/testing-grunt-plugin-from-grunt.html
module.exports = function (grunt) {
  var gLoad = require('./grunt.load.this');
  grunt.initConfig({
    build_include: {
       default: {
        options: {
          match: {
            // see: https://regexr.com/4d0sd
            // see entire regular expression: https://regexr.com/4d13t
            // (?:(?:#))[ \t]*include_build\((?:[ ]+)?(?:['"])?(.*?)(?:['"](?:[ ]+)?)?\)(?:[\n\r]+)?(?:\[(.*)\])?
            name: 'include_build',
            // options must be on the same line set parameters to do this.
            parameters: `(?:\\[(.*)\\])?`,
            prefix: '(?:(?:#))[ \\t]*',
            suffix: ''
          }
        },
        src: './fixtures/regex_simple.txt',
        dest: '../scratch/test/regex_simple_replaced.txt'
      },
      minus_plus: {
        options: {
          match: {
            // see: https://regexr.com/4dr4m
            // ^----[ ]*minus_plus\[(?:[ ]+)?(?:['"])?(.*?)(?:['"](?:[ ]+)?)?\](?:\{(.*)\})?(?:(?:[ ]+)?\+\+\+\+(?:(?:$)|(?:[\r\n]+)))
            name: 'minus_plus',
            fileName: `\\[(?:[ ]+)?(?:['"])?(.*?)(?:['"](?:[ ]+)?)?\\]`,
            parameters: `(?:\\{(.*)\\})?`,
            prefix: '^----[ ]*',
            suffix: '(?:(?:[ ]+)?\\+\\+\\+\\+(?:(?:$)|(?:[\\r\\n]+)))',
            options: 'im'
          }
        },
        src: './fixtures/regex_minus_plus.txt',
        dest: '../scratch/test/regex_minus_plus_replaced.txt'
      }
    }
  });
  gLoad(grunt);
  grunt.registerTask('default', ['build_include']);
};