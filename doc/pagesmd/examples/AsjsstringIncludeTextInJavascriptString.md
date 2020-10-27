# Asjsstring to Include Text In Javascript

## BUILD_INCLUDE

<div class="nowrapcode">

```js
var getStyleCss = function () {
  var css = '// BUILD_INCLUDE("./scratch/css/style.min.css")[asjsstring,breakString?width=80]';
  return css;
};
```

</div>

### Include minified css file

Include file as javascript string.  
In this case we have a file that has been minified in the build process an outputed to `./scratch/css/style.min.css`.  
The output file `style.min.css` is one long line. **BUILD_INCLUDE** can be used to inlcude the file and make it a little more readable.

### Options

`[asjsstring,breakString?width=80]`

[[include:options/asjsstring/asjsstring.md]]
[[include:options/breakstring/breakstring.md]]
[[include:options/breakstring/width.md]]

### Option

`breakString?width=80`

`Width=80` determines that each line will be broken at 80 characers.

### Config

#### GruntFile.js

```js
module.exports = function (grunt) {
  grunt.initConfig({
    build_include: {
      default: {
        match: 'buildIncludeSlash',
        src: './lib/main.js',
        dest: './scratch/main.js'
      }
    }
  });
  grunt.loadNpmTasks('grunt-build-include');
  grunt.registerTask('default', ['build_include:default']);
};
```

### Output

<div class="nowrapcode">

```js
var getStyleCss = function () {
  var css = '\
.mem-fs-button::after{content:\"\";background-image:url(data:image/png;base64,i\
VBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAACk0lEQVR42mNgGAWjYBSMUFAlx8RQI69I\
JJanyK5qOS4S7BIjzfAaeVmGFbr/icYLtH4zNClmkOyJXpXjDEt1iLdnktp92noEhGdqfCTJjnoFV5L\
toItHpqu/JcmOOnnzgfXIciBerP0PBc/QeA8MYTeSk1aH8mKGeVo/UcxaovOPfh5pVeqhSSEDyvhT1B\
7TL2nRwjMQTzyhbdICOXyZDu08g8sT6CUaxR4BpdtWpS6aeAaXJ+Zq/mBoV5pLfY+AALU9g88TtfJaD\
C2KDbTxCH7P9FHVEyBABY9IoxiwGMkj+DzTrFhOtB2T1O7h9QRVPAICoGYHzIAZGh8w5LF5ZqbGJ7Jr\
dXRPYFPXrbKHdI80KiSBPTBd/Q3YQGygVakbxTNT1V8SZXatvCE4BvF5AgbalRYyzNb8yjBR9SZDtbw\
I7VrKTYrF4HbWVPUXwGaHPdH62pQmMczS+AxMLneBntAY7XKMglEwCkbBKBgFgwY0KIQCa3UbElu/LO\
BmEK6mCZUdGAJsZznjbYpPVnsAb/22K80j0hNs4AELWC8Q1GbDrZYH6OEU8j3cp3oW3qjrVN5AVH9it\
uY3IhuksUR1zqrl+BhmaX6B94lAMUhyp2c52kgiMZ2iycAREOJavzoY/XFsnmlSLERRM0H1OvV6iPh7\
dsS3YonpNtOsq0tM95QUQMgzNPEItT1BjGdo4hFaeIKQZyaq3ab9IDa1PIHPMzQfMqW2J4j1DFU9ArK\
oQ3kleBwLgnuAlaYHmQN0fMAitgDJrD6wYwd0fqRDeRmJnmADDx8NuokeYmt1RPMnfHDOWE1Uu0myHf\
gmdajiEdBAGKi5QRx+BBwB3EXW4BkoVvpVLxNtV6fy2tGuxigYBaNg+AAAZ7k6IXnaMaQAAAAASUVOR\
K5CYII=);background-size:cover;opacity:.4;top:0;left:0;bottom:0;right:0;positio\
n:absolute;z-index:100;-webkit-filter:grayscale(1);filter:grayscale(1)}.mem-fs-\
button-parent{width:50px;height:50px;position:fixed;top:10px;right:10px;z-index\
:101}.mem-fs-button{position:absolute;top:0;left:0;right:0;bottom:0}.mem-fs-but\
ton:hover{cursor:pointer;opacity:1;filter:grayscale(0);-webkit-filter:grayscale\
(0);-webkit-filter:drop-shadow(4px 4px 4px #d107c0);filter:drop-shadow(4px 4px \
4px #d107c0)}.mem-fs-button:hover::after{content:\"\";cursor:pointer;opacity:1;\
filter:grayscale(0);-webkit-filter:grayscale(0)}.mem-fs-button-parent .mem-fs-b\
tntooltip{visibility:hidden;width:120px;background-color:#272822;color:#fff;tex\
t-align:center;border-radius:6px;padding:5px 0;position:absolute;z-index:1;top:\
2px;right:105%;opacity:0;transition:opacity 1s}.mem-fs-button-parent:hover .mem\
-fs-btntooltip{visibility:visible;opacity:1}.mem-fs-button-parent .mem-fs-btnto\
oltip::after{content:\"\";position:absolute;top:50%;left:100%;margin-top:-5px;b\
order-width:5px;border-style:solid;border-color:transparent transparent transpa\
rent #272822}.mem-fs-game{background-color:#8d6b15}.mem-fs-no-sel{-webkit-user-\
select:none;user-select:none;-o-user-select:none;-webkit-touch-callout:none;-kh\
tml-user-select:none;-moz-user-select:none;-ms-user-select:none}.mem-fs-wrap-ct\
l{background-color:brown}div.mem-fs-ctl{display:block;width:100%;text-align:cen\
ter}div#mem-fs-game-wrap div#game{border:0!important}div#mem-ctl-wrap div.mem-f\
s-ctl{display:inline-block;margin:0 0 10px 0}div.mem-fs-toggle-ctl{display:inli\
ne-block;width:100%;text-align:center}div.mem-fs-div-tog{display:inline-block}d\
iv.mem-fs-div-tog:hover{cursor:pointer}i.mem-fs-tog{border:solid #000;border-wi\
dth:0 3px 3px 0;display:inline-block;padding:3px}i.mem-fs-tog.right{transform:r\
otate(-45deg);-webkit-transform:rotate(-45deg)}i.mem-fs-tog.left{transform:rota\
te(135deg);-webkit-transform:rotate(135deg)}i.mem-fs-tog.up{transform:rotate(-1\
35deg);-webkit-transform:rotate(-135deg)}i.mem-fs-tog.down{transform:rotate(45d\
eg);-webkit-transform:rotate(45deg)}';
  return css;
};

```

</div>

[[include:style/nowrapcode.html]]  
[[include:style/heading.html]]