module.exports = function (grunt) {
  grunt.initConfig({
    build_include: {
      default: {
        options: {
          expand: true,
          fence: 'strict'
        },
        src: './fixtures/simple_fenced.txt',
        dest: '../scratch/test/simple_fenced_replaced.txt'
      }
    }
  });
  grunt.loadTasks('./../tasks');
  grunt.registerTask('default', ['build_include:default']);
};