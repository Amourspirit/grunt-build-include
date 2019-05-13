// https://www.javacodegeeks.com/2015/02/testing-grunt-plugin-from-grunt.html
module.exports = function (grunt) {
  grunt.initConfig({
    build_include: {
      by_string: {
        options: {
          match: 'BuildIncludeSlash'
        },
        src: './fixtures/textOpt.txt',
        dest: '../scratch/test/textOpt_slash_replaced.txt'
      }
    }
  });
  grunt.loadTasks('./../tasks');
  grunt.registerTask('default', ['build_include']);
};