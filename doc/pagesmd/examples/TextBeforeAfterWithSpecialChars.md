# Text Before After With Special Chars

## BUILD_INCLUDE

<div class="nowrapcode">

```text
// BUILD_INCLUDE("./scratch/replace01.txt")[text?before=\[\n&after=\n\]&PadRight=\\,breakstring?width=60]
```

</div>

### OR

<div class="nowrapcode">

```text
// BUILD_INCLUDE("./scratch/replace01.txt")[text?before=%5B\n&after=\n%5D&PadRight=%5C,breakstring?width=60]
```

</div>

### Text padding and break lines using BUILD_INCLUDE

Includes [replace01.txt](replacements/replace01.txt.html).  
Special characters are escaped.  
See: [Escaping Parameters](/pages/Docs/misc/EscapingParameters.html)  

### Options

`[text?before=\[\n&after=\n\]&PadRight=\\,breakstring?width=60]`  
--or--  
`[text?before=%5B\n&after=\n%5D&PadRight=%5C,breakstring?width=60]`

[[include:options/text/text.md]]

[[include:options/text/before/before.md]]

[[include:options/text/after/after.md]]

[[include:options/text/padding/padright.md]]

[[include:options/breakstring/breakstring.md]]

[[include:options/breakstring/width.md]]

### Option

`before=\[\n` or `before=%5B\n`  
Inserts [ followed by a new line. The rest of the input contents will start on the new line.

```text
[

```

`PadRight=\\` or `PadRight=%5C`  
Inserts \ at the end of each line.

`after=\n\]` or `after=\n%5D`  
Inserts new line and the end of the input contents followed by ]

```text

]
```

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
[
The quick, brown fox jumps over a lazy dog. DJs flock by whe\
n MTV ax quiz prog. Junk MTV quiz graced by fox whelps.Bawds\
 jog, flick quartz, vex nymphs. Waltz, bad nymph, for quick \
jigs vex! Fox nymphs grab quick-jived waltz. Brick quiz whan\
gs jumpy veldt fox.Bright vixens jump; dozy fowl quack. Quic\
k wafting zephyrs vex bold Jim. Quick zephyrs blow, vexing d\
aft Jim. Sex-charged fop blew my junk TV quiz.How quickly da\
ft jumping zebras vex. Two driven jocks help fax my big quiz\
. Quick, Baz, get my woven flax jodhpurs! "Now fax quiz Jack\
!" my brave ghost pled. Five quacking zephyrs jolt my wax be\
d. Flummoxed by job, kvetching W. zaps Iraq. Cozy sphinx wav\
es quart jug of bad milk.A very bad quack might jinx zippy f\
owls. Few quips galvanized the mock jury box. Quick brown do\
gs jump over the lazy fox. The jay, pig, fox, zebra, and my \
wolves quack!Blowzy red vixens fight for a quick jump. Joaqu\
in Phoenix was gazed by MTV for luck. A wizard’s job is to v\
ex chumps quickly in fog. Watch "Jeopardy! ", Alex Trebek's \
fun TV quiz game. Woven silk pyjamas exchanged for blue quar\
tz.\
]
```

</div>

[[include:style/nowrapcode.html]]  
[[include:style/heading.html]]