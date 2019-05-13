// https://www.javacodegeeks.com/2015/02/testing-grunt-plugin-from-grunt.html
module.exports = function (grunt) {
  grunt.initConfig({
    build_include: {
       default: {
        options: {
          expand: true,
          match: {
            name: 'include_build',
            // options must be on the same line set parameters to do this.
            parameters: `(?:\\[(.*)\\])?`,
            // see: https://regexr.com/4d0sd
            // see entire regular expression: https://regexr.com/4d13t
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

  grunt.loadTasks('./../tasks');
  grunt.registerTask('default', ['build_include']);
};