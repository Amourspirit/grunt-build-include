// https://www.javacodegeeks.com/2015/02/testing-grunt-plugin-from-grunt.html
module.exports = function (grunt) {
  var gLoad = require('./grunt.load.this');
  grunt.initConfig({
    build_include: {
      default: {
        options: {
          match: 'buildIncludeSlash'
        },
        src: './fixtures/commentHash.txt',
        dest: '../scratch/test/commentHash_replaced.txt'
      }
    }
  });

  gLoad(grunt);
  grunt.registerTask('default', ['build_include:default']);

};