**MATCH EXAMPLE**

Matchs options such as:  
`---- minus_plus[scratch/main.ts] ++++`  
`----minus_plus[scratch/modules/myfile.ts]{options}++++`

The Regex will example can be see on [regexr.com](https://regexr.com/4dr4m)
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
        src: './src/maintst',
        dest: './scratch/ts/main.ts'
      }
    }
  });
  grunt.loadNpmTasks('grunt-build-include');
};
```