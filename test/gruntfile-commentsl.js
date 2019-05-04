// https://www.javacodegeeks.com/2015/02/testing-grunt-plugin-from-grunt.html
module.exports = function (grunt) {
  grunt.initConfig({
    build_include: {
      default: {
        options: {
          expand: true,
        },
        src: './fixtures/commetsl01.txt',
        dest: '../scratch/test/commetsl01_replaced.txt'
      }
    }
  });

  grunt.loadTasks('./../tasks');
  grunt.registerTask('default', ['build_include:default']);

};