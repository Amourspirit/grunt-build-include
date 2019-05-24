### FENCE EXAMPLE

Matches built in fence rules of [EscapeFence](/grunt-build-include/classes/fences.escapefence.html) [StrictFence](/grunt-build-include/classes/fences.strictfence.html), [TildeFence](/grunt-build-include/classes/fences.tildefence.html) and [regexKind.multiFlex](/grunt-build-include/enums/enums.fencekind.html#multiFlex)

#### Config

##### GruntFile.js

```js
module.exports = function (grunt) {
  grunt.initConfig({
    build_include: {
      default: {
        options: {
          fence: 'multiFlex'
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