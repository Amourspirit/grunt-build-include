<p align="center">
«-(¯`v´¯)-« <a href="https://www.npmjs.com/package/grunt-build-include">【🇬​🇷​🇺​🇳​🇹​-🇧​🇺​🇮​🇱​🇩​-🇮​🇳​🇨​🇱​🇺​🇩​🇪​】</a> »-(¯`v´¯)-»
</ br>
</p>
<p align="center">
<a href="https://travis-ci.org/Amourspirit/grunt-build-include"><img src="https://travis-ci.org/Amourspirit/grunt-build-include.svg?branch=master" /></a>
<a href="https://snyk.io/test/github/Amourspirit/grunt-build-include?targetFile=package.json">
<img src="https://snyk.io/test/github/Amourspirit/grunt-build-include/badge.svg?targetFile=package.json" /></a>
<a href="https://www.npmjs.com/package/grunt-build-include"><img alt="node" src="https://img.shields.io/node/v/grunt-build-include.svg"></a>
<img src="https://img.shields.io/github/package-json/v/Amourspirit/grunt-build-include.svg" />
<img src="https://img.shields.io/github/license/Amourspirit/grunt-build-include.svg" />
<a href="https://github.com/badges/stability-badges"> <img src="https://badges.github.io/stability-badges/dist/stable.svg" /></a>
</p>

# grunt-build-include

## Documentation

Extensive documentation can be found [here](https://amourspirit.github.io/grunt-build-include/pages/Docs/).

## The What

This is a plugin for [Grunt](https://gruntjs.com/) that allows you to rescursivly include other files into your output by using **build_include** statements.

Can be a simple include that replaces **build_include** statement with with the contents of a file.

This plugin is a [grunt](https://gruntjs.com/) implementation of the [build_include](https://www.npmjs.com/package/build-include) package.

**Example:**

```js
// BUILD_INCLUDE("./scratch/mysnippet.js")
```

Can be a more complex replacement that applies formating using [Options](https://amourspirit.github.io/grunt-build-include/pages/Docs/Options/index.html)

**Example:**

```js
var getStyleCss = function () {
  var css = '// BUILD_INCLUDE("./scratch/style.min.css")[asjsstring,breakString?width=80]';
  return css;
};
```

**See Example:** [Asjsstring Include Text In Javascript String](https://amourspirit.github.io/grunt-build-include/pages/examples/AsjsstringIncludeTextInJavascriptString.html)

## Getting started

If you haven't used [Grunt](https://gruntjs.com/) before, be sure to check out the [Getting Started](https://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](https://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```text
npm install grunt-build-include --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-build-include');
```

This plugin was designed to work with Grunt 0.4.x. If you're still using grunt v0.3.x it's strongly recommended to [upgrade](https://gruntjs.com/upgrading-from-0.3-to-0.4).