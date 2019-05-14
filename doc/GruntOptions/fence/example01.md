### FENCE EXAMPLE

Matches:  

```text
---
fenced text
---
```

--or--

```text
---text
fenced text
---
```

#### Config

##### GruntFile.js

```js
module.exports = function (grunt) {
  grunt.initConfig({
    build_include: {
      default: {
        options: {
          fence: {
            start: /^---(?:([a-zA-Z]+)?(?:[\r\n]+))(?:[\s\S]+?)/,
            end: /^---(?:(?:$)|(?:[\r\n]+))/
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