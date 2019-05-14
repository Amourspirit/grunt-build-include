### FENCE EXAMPLE

Matches built in fence rules of [EscapeFence](/classes/fences.escapefence.html)
by seting fence to string value of [regexKind.escape](/enums/enums.fencekind.html#escape)

#### Config

##### GruntFile.js

```js
module.exports = function (grunt) {
  grunt.initConfig({
    build_include: {
      default: {
        options: {
          fence: 'escape'
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