// https://www.javacodegeeks.com/2015/02/testing-grunt-plugin-from-grunt.html
module.exports = function (grunt) {
  grunt.initConfig({
    build_include: {
      default: {
        options: {
          expand: true,
          match: {
            kind: 'buildIncludePound',
            name: 'INCLUDE_BUILD'
          }
        },
        src: './fixtures/simple_regex.txt',
        dest: '../scratch/test/simple_regex_pound_replaced.txt'
      }
    }
  });
  grunt.loadTasks('./../tasks');
  grunt.registerTask('default', ['build_include:default']);
};