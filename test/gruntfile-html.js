// https://www.javacodegeeks.com/2015/02/testing-grunt-plugin-from-grunt.html
module.exports = function (grunt) {
  var gLoad = require('./grunt.load.this');
  grunt.initConfig({
    build_include: {
      default: {
        options: {
          match: {
            kind: 'buildIncludeHtml',
            name: 'BUILD_HTML'
          }
        },
        src: './fixtures/simple_html.txt',
        dest: '../scratch/test/simple_html_replaced.txt'
      }
    }
  });
  gLoad(grunt);
  grunt.registerTask('default', ['build_include:default']);
};