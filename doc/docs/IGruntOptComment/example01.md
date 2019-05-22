#### Example

```js
module.exports = function (grunt) {
  grunt.initConfig({
    build_include: {
      default: {
        options: {
          match: {
            kind: 'bracketInclude',
            path: './scratch/'
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