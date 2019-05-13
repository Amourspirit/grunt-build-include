// https://www.javacodegeeks.com/2015/02/testing-grunt-plugin-from-grunt.html
module.exports = function (grunt) {
  grunt.initConfig({
    build_include: {
      default: {
        options: {
          match: {
            kind: 'bracketIncludeMulti',
            path: './fixtures/'
          },
          comment: {
            type: 'singleAsterisk'
          },
          text: {
            indent: true
          },
          fence: 'strict'
        },
        src: './fixtures/includeBracketFence.txt',
        dest: '../scratch/test/includeBracketFence_replaced.txt'
      }
    }
  });
  grunt.loadTasks('./../tasks');
  grunt.registerTask('default', ['build_include:default']);
};