Represents a generic item with a string key value

Example:

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