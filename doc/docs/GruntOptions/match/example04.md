### MATCH EXAMPLE

Matches build in match rules of [MatchBuildIncludeSlash](/classes/matchoptions.matchbuildincludeslash.html)
by seting match to numeric value of [regexKind.buildIncludeSlash](/enums/enums.regexkind.html#buildincludeslash)

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
  });
  grunt.loadNpmTasks('grunt-build-include');
  grunt.registerTask('default', ['build_include:default']);
};
```