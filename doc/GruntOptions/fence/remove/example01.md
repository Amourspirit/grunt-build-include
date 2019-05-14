### FENCE EXAMPLE

Matches built in fence rules of [StrictFence](/classes/fences.strictfence.html)
by seting fence to string value of [regexKind.strict](/enums/enums.fencekind.html#strict) and excludes fences from output.

#### Config

##### GruntFile.js

```js
module.exports = function (grunt) {
  grunt.initConfig({
    build_include: {
      default: {
        options: {
          fence: 'strict',
          remove: true
        },
        src: './src/maint.ts',
        dest: './scratch/ts/main.ts'
      }
    }
  });
  grunt.loadNpmTasks('grunt-build-include');
  grunt.registerTask('default', ['build_include:default']);
};
```