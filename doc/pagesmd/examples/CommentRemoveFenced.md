# Comment Type & Text Options

## BUILD_INCLUDE

<div class="nowrapcode">

```js
/**
 // build_include('./fixtures/md/replace02.txt')[fence?type=multiflex&remove=true,comment?type=singleAsterisk,text?indent=true]
 */
```

</div>

File [replace02.txt](replacements/replace02.txt.html) is to be included in output file.
File [replace02.txt](replacements/replace02.txt.html) contains fences and enpty lines.  
When fences are removed it may result in extra lines that are not the most desired output.  
When you need to remove empty lines and or white space lines you can use the `text` `whiteSpaceLine` options.  
See example: [Comment Remove Fenced And White Space Lines](CommentRemoveFencedAndWhiteSpaceLines.html)

### Options

<div class="nowrapcode">

```text
[fence?type=multiflex&remove=true,comment?type=singleAsterisk,text?indent=true]
```

</div>

[[include:options/comment/comment.md]]

[[include:options/comment/type/SingleAsterisk.md]]

[[include:options/text/text.md]]

[[include:options/text/indent/indent.md]]

### Output

<div class="nowrapcode">

```js
/**
 * # Fence Test
 * 
 * 
 * ## Repace02
 * 
 *   
 * 
 * `type=multiflex` Apply multiflex fencing options.  
 * 
 * Matches the pattern of:  
 * (optional space)(optional `*`)(optional space)(reguired &#96;&#96;&#96;(optional type)
 * fenced text
 * (reguired &#96;&#96;&#96;)
 * 
 * Some match examples:
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * See Also: [flexFence](/modules/_modules_fenceoptions_.html#flexfence)  
 * 
 *     
 */
```

</div>

[[include:style/nowrapcode.html]]  
[[include:style/heading.html]]