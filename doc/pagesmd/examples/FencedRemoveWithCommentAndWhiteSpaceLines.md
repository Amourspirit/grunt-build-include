# Fenced, Comment, Text Example

## BUILD_INCLUDE

<div class="nowrapcode">

```js
/**
 // build_include('./fixtures/md/replace02.txt')[fence?type=multiflex&remove=true,comment?type=singleAsterisk,text?indent=true&whiteSpaceLine=removeAllWs]
 */
```

</div>

File [replace02.txt](replacements/replace02.txt.html) is to be included in output file.

### Options

<div class="nowrapcode">

```text
[fence?type=multiflex&remove=true,comment?type=singleAsterisk,text?indent=true&whiteSpaceLine=removeAllWs]
```

</div>

[[include:options/fence/fence.md]]

[[include:options/fence/type/type.md]]

[[include:options/fence/type/multiflex.md]]
See: Fence Type [MultiFlex](/pages/Docs/Options/fence/type/MultiFlex/)

[[include:options/fence/remove/remove.md]]

[[include:options/comment/comment.md]]

[[include:options/comment/type/SingleAsterisk.md]]

[[include:options/text/text.md]]

[[include:options/text/indent/indent.md]]

[[include:options/text/whiteSpaceLine/removeAllWs.md]]

### Output

<div class="nowrapcode">

```js
/**
 * # Fence Test
 * ## Repace02
 * `type=multiflex` Apply multiflex fencing options.  
 * Matches the pattern of:  
 * (optional space)(optional `*`)(optional space)(reguired &#96;&#96;&#96;(optional type)
 * fenced text
 * (reguired &#96;&#96;&#96;)
 * Some match examples:
 * See Also: [flexFence](/modules/_modules_fenceoptions_.html#flexfence)  
 */
```

</div>

[[include:style/nowrapcode.html]]  
[[include:style/heading.html]]