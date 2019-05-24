<br/>

```js
function getStyle() {
 var css = '// BUILD_INCLUDE("../style.min.css")[asJsString]';
 return css;
}
```

To break include into muliple lines **asJsString** can be combined with **breakString**

```js
function getStyle() {
// included file will be broken into lines 100 characters per line.
// this makes for much better readability
 var css = '// BUILD_INCLUDE("../style.min.css")[asJsString, breakstring?width=100]';
 return css;
}
```