### FENCE EXAMPLE

Matches built in fence rules of [FlexFence](/classes/fences.flexfence.html)
by seting fence to string value of [regexKind.flex](/enums/enums.fencekind.html#flex)

#### Config

##### GruntFile.js

```js
module.exports = function (grunt) {
  grunt.initConfig({
    build_include: {
      default: {
        options: {
          fence: 'flex'
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