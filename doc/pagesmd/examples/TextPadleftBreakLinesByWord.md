# Text Padleft Break Lines By Word

## BUILD_INCLUDE

<div class="nowrapcode">

```text
// BUILD_INCLUDE("./scratch/replace01.txt")[text?padleft=# ,breakstring?width=75&flags=word]
```

</div>

### Text padding and break lines using BUILD_INCLUDE

File with long lines such as [replace01.txt](replacements/replace01.txt.html).

Include the contenst in another file and make it more readable.  
Also `# ` is required at the start of each line.

### Options

`[text?padleft=# ,breakstring?width=75&flags=word]`  

[[include:options/text/text.md]]

[[include:options/text/padding/padleft.md]]

[[include:options/breakstring/breakstring.md]]

[[include:options/breakstring/width.md]]

[[include:options/breakstring/flags/word.md]]

### Option

`text?padleft=# `  
Pads the left side of each line with a single # and a single space.

Note: There is a single space after **#**  
Note: `text` Options are applied after `breakstring` options.

`breakstring?width=75&flags=word`  
Due to `flags=word` lines will be broken and close as possible to 75 characters without breaking in a word.  

Note: `breakstring` is applied before `text` options.  

### Config

#### GruntFile.js

```js
module.exports = function (grunt) {
  grunt.initConfig({
    build_include: {
      default: {
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
# The quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax quiz prog.
# Junk MTV quiz graced by fox whelps.Bawds jog, flick quartz, vex nymphs. Waltz,
# bad nymph, for quick jigs vex! Fox nymphs grab quick-jived waltz. Brick quiz
# whangs jumpy veldt fox.Bright vixens jump; dozy fowl quack. Quick wafting zephyrs
# vex bold Jim. Quick zephyrs blow, vexing daft Jim. Sex-charged fop blew my
# junk TV quiz.How quickly daft jumping zebras vex. Two driven jocks help fax
# my big quiz. Quick, Baz, get my woven flax jodhpurs! "Now fax quiz Jack!" my
# brave ghost pled. Five quacking zephyrs jolt my wax bed. Flummoxed by job,
# kvetching W. zaps Iraq. Cozy sphinx waves quart jug of bad milk.A very bad
# quack might jinx zippy fowls. Few quips galvanized the mock jury box. Quick
# brown dogs jump over the lazy fox. The jay, pig, fox, zebra, and my wolves
# quack!Blowzy red vixens fight for a quick jump. Joaquin Phoenix was gazed by
# MTV for luck. A wizard’s job is to vex chumps quickly in fog. Watch "Jeopardy!
# ", Alex Trebek's fun TV quiz game. Woven silk pyjamas exchanged for blue quartz.
```

</div>

[[include:style/nowrapcode.html]]