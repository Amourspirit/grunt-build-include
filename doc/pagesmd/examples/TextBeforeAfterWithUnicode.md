# Text Before After With Unicode

## BUILD_INCLUDE

<div class="nowrapcode">

```text
// BUILD_INCLUDE("./scratch/replace01.txt")[text?before=# \u{1F913}\n# \u{1F44C}\n&padleft=#\u2014\u{1F600}\u2014,breakstring?width=50&flags=word]
```

</div>

### Text padding and break lines using BUILD_INCLUDE

Includes [replace01.txt](replacements/replace01.txt.html) and places text before and after output.


### Options

`[text?before=# \u{1F913}\n# \u{1F44C}\n&padleft=#\u2014\u{1F600}\u2014,breakstring?width=50&flags=word]`  

[[include:options/text/text.md]]

[[include:options/text/before/before.md]]

[[include:options/text/padding/padleft.md]]

[[include:options/text/after/after.md]]

[[include:options/breakstring/breakstring.md]]

[[include:options/breakstring/width.md]]

[[include:options/breakstring/flags/word.md]]

### Option

`text?before=# \u{1F913}\n# \u{1F44C}\n&padleft=#\u2014\u{1F600}\u2014`

`before=# \u{1F913}\n# \u{1F44C}\n`  
Inserts at the start of the output:

```text
# 🤓
# 👌
```

Note: `\n` is used to insert a new line:  
Note: unicode characters can be used in text parameters.

`padleft=#\u2014\u{1F600}\u2014`  
Inserts before each line:

```text
#—😀—
```

### Config

#### GruntFile.js

```js
module.exports = function (grunt) {
  grunt.initConfig({
    build_include: {
      default: {
        match: 'buildIncludeSlash',
        src: './lib/test.txt',
        dest: './scratch/test.txt'
      }
    }
  });
  grunt.loadNpmTasks('grunt-build-include');
  grunt.registerTask('default', ['build_include:default']);
};
```

### Output

<div class="nowrapcode">

```text
# 🤓
# 👌
#—😀—The quick, brown fox jumps over a lazy dog. DJs flock
#—😀—by when MTV ax quiz prog. Junk MTV quiz graced by
#—😀—fox whelps.Bawds jog, flick quartz, vex nymphs. Waltz,
#—😀—bad nymph, for quick jigs vex! Fox nymphs grab quick-jived
#—😀—waltz. Brick quiz whangs jumpy veldt fox.Bright vixens
#—😀—jump; dozy fowl quack. Quick wafting zephyrs vex bold
#—😀—Jim. Quick zephyrs blow, vexing daft Jim. Sex-charged
#—😀—fop blew my junk TV quiz.How quickly daft jumping
#—😀—zebras vex. Two driven jocks help fax my big quiz.
#—😀—Quick, Baz, get my woven flax jodhpurs! "Now fax quiz
#—😀—Jack!" my brave ghost pled. Five quacking zephyrs
#—😀—jolt my wax bed. Flummoxed by job, kvetching W. zaps
#—😀—Iraq. Cozy sphinx waves quart jug of bad milk.A very
#—😀—bad quack might jinx zippy fowls. Few quips galvanized
#—😀—the mock jury box. Quick brown dogs jump over the
#—😀—lazy fox. The jay, pig, fox, zebra, and my wolves
#—😀—quack!Blowzy red vixens fight for a quick jump. Joaquin
#—😀—Phoenix was gazed by MTV for luck. A wizard’s job
#—😀—is to vex chumps quickly in fog. Watch "Jeopardy!
#—😀—", Alex Trebek's fun TV quiz game. Woven silk pyjamas
#—😀—exchanged for blue quartz.
```

</div>

[[include:style/nowrapcode.html]]  
[[include:style/heading.html]]