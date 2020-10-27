module.exports = function (grunt) {
  var loader = require("./grunt-hacks.js");
  var gLoad = require('./grunt.load.this');
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
          match: 'buildIncludeSlash',
          fence: 'strict'
        },
        src: './fixtures/fence_inline.txt',
        dest: '../scratch/test/fenced_inline_replaced.txt'
      }
    }
  });
  gLoad(grunt);
  loader.loadParentNpmTasks(grunt, 'grunt-contrib-copy');
  grunt.registerTask('default', ['copy:fix', 'build_include:default']);
};