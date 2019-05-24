### MATCH EXAMPLE

Matches built in match rules of [MatchBuildIncludeSlash](/grunt-build-include/classes/matchoptions.matchbuildincludeslash.html)
by seting match to numeric value of [regexKind.buildIncludeSlash](/grunt-build-include/enums/enums.regexkind.html#buildincludeslash)

```js
module.exports = function (grunt) {
  grunt.initConfig({
   build_include: {
      default: {
        options: {
          match: 3
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