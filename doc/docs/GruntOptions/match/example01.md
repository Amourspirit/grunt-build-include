**MATCH EXAMPLE**

Matchs options such as:  
`# INCLUDE_BUILD(scratch/main.ts)`  
`#include_build(scratch/modules/myfile.ts)`

The Regex will example can be see on [regexr.com](https://regexr.com/4d13t)
```js
module.exports = function (grunt) {
  grunt.initConfig({
    build_include: {
      default: {
        options: {
          match: {
            name: 'include_build',
            parameters: `(?:\\[(.*)\\])?`,
            prefix: '(?:(?:#))[ \\t]*',
            suffix: ''
          }
        },
        src: './src/maintst',
        dest: './scratch/ts/main.ts'
      }
    }
  });
  grunt.loadNpmTasks('grunt-build-include');
};
```