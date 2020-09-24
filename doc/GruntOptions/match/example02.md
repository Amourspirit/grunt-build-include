### MATCH EXAMPLE

Matchs options such as:  
`---- minus_plus[scratch/main.ts] ++++`  
`----minus_plus[scratch/modules/myfile.ts]{options}++++`

The Regex will example can be see on [regexr.com](https://regexr.com/4dr4m)

**NOTE:** This match would not be able to apply [indent](/grunt-build-include/pages/Docs/Options/text/indent/index.html) due to the Regular Expression
starting at the beginning of line as indicated by the `prefix` starting with `^`.

```js
module.exports = function (grunt) {
  grunt.initConfig({
    build_include: {
      default: {
        options: {
          match: {
            name: 'minus_plus',
            fileName: `\\[(?:[ ]+)?(?:['"])?(.*?)(?:['"](?:[ ]+)?)?\\]`,
            parameters: `(?:\\{(.*)\\})?`,
            prefix: '^----[ ]*',
            suffix: '(?:(?:[ ]+)?\\+\\+\\+\\+(?:(?:$)|(?:[\\r\\n]+)))',
            options: 'im'
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