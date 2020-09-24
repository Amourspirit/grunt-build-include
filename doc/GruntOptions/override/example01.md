### EXAMPLE

With the configuration below all inline BUILD_INCLUDE statments would have [asJsString](/grunt-build-include/pages/Docs/GruntFile/Options/asjsstring/index.html) applied
and each BUILD_INCLUE file would be split into lines that are 100 characters wide with extra line breaks removed using [breakstring](/grunt-build-include/pages/Docs/GruntFile/Options/breakstring/index.html).

#### Config

##### GruntFile.js

```js
module.exports = function (grunt) {
  grunt.initConfig({
    build_include: {
      default: {
        options: {
          asJsString: true,
          breakstring: {
            width: 100,
            break: 'width',
            eol: 'noLnBr'
          }
          override: true
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