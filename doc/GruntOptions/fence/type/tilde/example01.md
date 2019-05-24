### FENCE EXAMPLE

Matches built in fence rules of [TildeFence](/grunt-build-include/classes/fences.tildefence.html)
by seting fence to string value of [regexKind.tidle](/grunt-build-include/enums/enums.fencekind.html#tilde)

#### Config

##### GruntFile.js

```js
module.exports = function (grunt) {
  grunt.initConfig({
    build_include: {
      default: {
        options: {
          fence: 'tilde'
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