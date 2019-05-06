Text option for grunt.  
Text options set in grunt configuration are merged with any text options set in the file that contains the build_include ( or varation of ).
File level options will always take priority.

**Example:**

```js
module.exports = function (grunt) {
  grunt.initConfig({
    build_include: {
      default: {
        options: {
          expand: true,
          match: {
            kind: 'buildIncludeSlash',
            path: './md/'
          },
          text: {
            before: '\n',
            codekind: 'encode',
            code: 'jsString'
          }
        },
        src: './lib/main.ts',
        dest: './scratch/ts/main.ts'
      }
    }
  });
  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('grunt-build-include');
  grunt.registerTask('default', ['build_include:default']);
};
```