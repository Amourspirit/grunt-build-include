# Sample Markdown file

This file is replace7.md

We can fence things

```ini
[COUNT]
zero = 0
one = 1
two = 2
three = 3
four = 4
five = 5
six = 6
seven = 7
eight = 8
nine = 9
```

Javascript example that is built with BUILD_INCLUDE

```js
var getStyleCss = function () {
  var css = '// BUILD_INCLUDE("/scratch/test/css/style.min.css")[asjsstring,breakString?width=100]';
  return css;
};
```

All done with fencing.