# Comment Type Single

## BUILD_INCLUDE

<div class="nowrapcode">

```text
// BUILD_INCLUDE("./scratch/replace1.txt")[comment?type=Single]
```

</div>

File [replace01.txt](replacements/replace01.txt.html) is to be included in output file.

### Options

`[comment?type=Single]`

[[include:options/comment/comment.md]]
[[include:options/comment/type/single.md]]

### Config

#### GruntFile.js

```js
module.exports = function (grunt) {
  grunt.initConfig({
    build_include: {
      default: {
        match: {
          kind: 'buildIncludeSlash'
        },
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
// The quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax quiz prog. Junk MTV quiz graced by fox whelps.
// Bawds jog, flick quartz, vex nymphs. Waltz, bad nymph, for quick jigs vex! Fox nymphs grab quick-jived waltz. Brick quiz whangs jumpy veldt fox.
// Bright vixens jump; dozy fowl quack. Quick wafting zephyrs vex bold Jim. Quick zephyrs blow, vexing daft Jim. Sex-charged fop blew my junk TV quiz.
// 
// How quickly daft jumping zebras vex. Two driven jocks help fax my big quiz. Quick, Baz, get my woven flax jodhpurs! "Now fax quiz Jack!
// " my brave ghost pled. Five quacking zephyrs jolt my wax bed. Flummoxed by job, kvetching W. zaps Iraq. Cozy sphinx waves quart jug of bad milk.
// A very bad quack might jinx zippy fowls. Few quips galvanized the mock jury box. Quick brown dogs jump over the lazy fox. The jay, pig, fox, zebra, and my wolves quack!
// Blowzy red vixens fight for a quick jump. Joaquin Phoenix was gazed by MTV for luck. A wizard’s job is to vex chumps quickly in fog. Watch "Jeopardy! ", Alex Trebek's fun TV quiz game. Woven silk pyjamas exchanged for blue quartz.
```

</div>

[[include:style/nowrapcode.html]]  
[[include:style/heading.html]]