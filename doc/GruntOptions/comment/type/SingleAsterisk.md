## Comment Type SingleAsterisk

`type:'singleAsterisk'` Pads the left side of each line with * and a single space.  
Useful for comment replacement that is required inline.

### Example

If you have the following.

```js
/**
 * [[include:doc/myMarkdown.md]]
 */
```

The output would be similar to the following.

```js
/**
 * my multi line comments
 * comments continue on this line
 */
```
