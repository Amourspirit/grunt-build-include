# Fenced, Comment, Text simple Example

File [replace03.txt](replacements/replace03.txt.html) is to be included in output file.
File [replace03.txt](replacements/replace03.txt.html) contains fences and enpty lines.  
In this example fences are excluded from any extra processing and included verbatim in the output.

### Options

<div class="nowrapcode">

```text
[fence?type=multiflex,comment?type=singleAsterisk,text?indent=true]
```

</div>

[[include:options/fence/fence.md]]

[[include:options/fence/type/type.md]]

[[include:options/fence/type/multiflex.md]]
See: Fence Type [MultiFlex](/grunt-build-include/pages/Docs/Options/fence/type/MultiFlex/index.html)

[[include:options/comment/comment.md]]

[[include:options/comment/type/SingleAsterisk.md]]

[[include:options/text/text.md]]

[[include:options/text/indent/indent.md]]

### Config

#### GruntFile.js

```js
module.exports = function (grunt) {
  grunt.initConfig({
    build_include: {
      default: {
        options: {
          match: {
            kind: 'bracketIncludeMulti',
            path: './fixtures/'
          },
          comment: {
            type: 'singleAsterisk'
          },
          text: {
            indent: true
          },
          fence: 'strict'
        },
        src: './src/interfaces.ts',
        dest: './scratch/js/interfaces.ts'
      }
    }
  });
  grunt.loadNpmTasks('grunt-build-include');
  grunt.registerTask('default', ['build_include:default']);
};
```

### Output

````text
/**
  * Represents a generic item with a string key value
  * 
  * Example:
  * 
```ts
const lst: IKeyValuec<string> = {
    src: 'https://someUrl.come/js/myjs.js',
    scrolling: 'yes',
    type: 'text/javascript'
};
for (const key in lst) {
    if (lst.hasOwnProperty(key)) {
    const value = lst[key];
    console.log(key, value);
    }
}
console.log('src: ', lst['src']);
console.log('type: ', lst.type);
```
  */
export interface IKeyValue<T> {
  [key: string]: T;
}
````

[[include:style/nowrapcode.html]]  
[[include:style/heading.html]]