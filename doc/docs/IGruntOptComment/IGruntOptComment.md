Comment option for grunt.  
Comments options set in grunt configuration are merged with any comment options set in the file that contains the build_include ( or varation of ).
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
            kind: 'bracketInclude',
            path: './fixtures/'
          },
          comment: {
            padleft: 2,
            type: 'singleAsterisk'
          }
        },
        src: './lib/includeBracket.ts',
        dest: './scratch/ts/includeBracket.ts'
      }
    }
  });
  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('grunt-build-include');
  grunt.registerTask('default', ['build_include:default']);
};
```