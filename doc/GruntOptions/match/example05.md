### MATCH EXAMPLE

This example shows how `match` can merge with other built in [matches](/enums/enums.regexkind.html).  
By setting `kind` value to [buildIncludeHtml](/enums/enums.regexkind.html#buildincludehtml) this match
will match all the values of [MatchBuildIncludeHtml](/classes/matchoptions.matchbuildincludehtml.html)
excpet will match on name `BUILD_HTML` instead of default value of [MatchBuildIncludeHtml.name](/classes/matchoptions.matchbuildincludehtml.html#name) which is `BUILD_INCLUDE`.

Matchs options such as:  
`<!-- BUILD_HTML(scratch/main.ts) -->`  
`<!-- BUILD_HTML(scratch/modules/myfile.ts) -->`

```js
module.exports = function (grunt) {
  grunt.initConfig({
    build_include: {
      default: {
        options: {
          match: {
            kind: 'buildIncludeHtml',
            name: 'BUILD_HTML'
          }
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