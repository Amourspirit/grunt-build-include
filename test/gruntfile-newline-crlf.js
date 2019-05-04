// https://www.javacodegeeks.com/2015/02/testing-grunt-plugin-from-grunt.html
module.exports = function (grunt) {
  grunt.initConfig({
    build_include: {
      default: {
        options: {
          expand: true,
        },
        src: './fixtures/simple_newline_crlf.txt',
        dest: '../scratch/test/simple_newline_replaced_crlf.txt'
      }
    }
  });

  grunt.loadTasks('./../tasks');
  grunt.registerTask('default', ['build_include:default']);
};