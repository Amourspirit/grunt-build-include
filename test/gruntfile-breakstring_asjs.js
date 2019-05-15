// https://www.javacodegeeks.com/2015/02/testing-grunt-plugin-from-grunt.html
module.exports = function (grunt) {
  var loader = require("./grunt-hacks.js");

  grunt.initConfig({
    copy: {
      fix: {
        files: [{
          src: './fixtures/style.min.css',
          dest: '../scratch/test/css/style.min.css'
        }],
      }
    },
    build_include: {
      default: {
        options: {
          asJsString: true,
          breakstring: 100
        },
        src: './fixtures/asJsString.txt',
        dest: '../scratch/test/gruntfile_asjsstring_replaced.txt'
      }
    }
  });

  grunt.loadTasks('./../tasks');
  loader.loadParentNpmTasks(grunt, 'grunt-contrib-copy');

  grunt.registerTask('default', ['copy:fix', 'build_include:default']);

};