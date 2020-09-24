# BUILD_INCLUDE Options

Build_include statements may be used without options which will resullt in the build_include statement being replaced with the contents of the replacement file verbatium.
However, sometimes you may need to alter the contents of the replacement file beore it is included in the destination
file. Options allow for many different mapulations before the replacement file data is included in the
destination file.

Options that may be applied to BUILD_INCLUDE statments.

* [AsJsString](asjsstring/index.html)
* [Breakstring](breakstring/index.html)
* [Comment](comment/index.html)
* [Fence](fence/index.html)
* [Text](text/index.html)

## Example

<div class="nowrapcode">

```js
var getStyleCss = function () {
  var css = '// BUILD_INCLUDE("./scratch/style.min.css")[asjsstring,breakString?width=80]';
  return css;
};
```

</div>

### Config

#### GruntFile.js

```js
module.exports = function (grunt) {
  grunt.initConfig({
    build_include: {
      default: {
        src: './lib/main.js',
        dest: './scratch/main.js'
      }
    }
  });
  grunt.loadNpmTasks('grunt-build-include');
  grunt.registerTask('default', ['build_include:default']);
};
```
**See Example:** [Asjsstring Include Text In Javascript String](/grunt-build-include/pages/examples/AsjsstringIncludeTextInJavascriptString.html)

[[include:style/nowrapcode.html]]