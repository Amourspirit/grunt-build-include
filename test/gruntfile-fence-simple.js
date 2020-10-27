module.exports = function (grunt) {
  var gLoad = require('./grunt.load.this');
  grunt.initConfig({
    build_include: {
      default: {
        options: {
          match: 'buildIncludeSlash',
          fence: 'strict'
        },
        src: './fixtures/simple_fenced.txt',
        dest: '../scratch/test/simple_fenced_replaced.txt'
      }
    }
  });
  gLoad(grunt);
  grunt.registerTask('default', ['build_include:default']);
};