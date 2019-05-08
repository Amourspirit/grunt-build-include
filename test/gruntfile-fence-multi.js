// https://www.javacodegeeks.com/2015/02/testing-grunt-plugin-from-grunt.html
module.exports = function (grunt) {
  grunt.initConfig({
    build_include: {
      default: {
        src: './fixtures/fence_multi.txt',
        dest: '../scratch/test/fence_multi_replaced.txt'
      }
    }
  });
  grunt.loadTasks('./../tasks');
  grunt.registerTask('default', ['build_include:default']);
};