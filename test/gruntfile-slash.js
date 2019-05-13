// https://www.javacodegeeks.com/2015/02/testing-grunt-plugin-from-grunt.html
module.exports = function (grunt) {
  grunt.initConfig({
    build_include: {
      default: {
        options: {
          expand: true,
          match: {
            kind: 'buildIncludeSlash'
          }
        },
        src: './fixtures/textOpt.txt',
        dest: '../scratch/test/textOpt_slash_replaced.txt'
      },
      by_string: {
        options: {
          expand: true,
          match: 'buildIncludeSlash'
        },
        src: './fixtures/textOpt.txt',
        dest: '../scratch/test/textOpt_slash_replaced.txt'
      },
      by_number: {
        options: {
          expand: true,
          match: 'buildIncludeSlash'
        },
        src: './fixtures/textOpt.txt',
        dest: '../scratch/test/textOpt_slash_replaced.txt'
      }
    }
  });
  grunt.loadTasks('./../tasks');
  grunt.registerTask('default', ['build_include:default']);
};