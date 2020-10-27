# GRUNT-BUILD-INCLUDE

Options that may be used with **grunt-build-include** statements.  
In most cases it is recommended to use the [options](Options/index.html) to set configuration options for a **build_include** statement.
This allows for fine control of how each **build_include** statement is processed.

**Grunt-build-include** is mainly a wrapper for [build-include](https://www.npmjs.com/package/build-include) package.
[Docs](https://amourspirit.github.io/build-include/pages/Docs/index.html)
for [build-include](https://www.npmjs.com/package/build-include) can be viewed here with extensive with many examples and options.

Sometimes more of a global approach is perfered. In these cases [Grunt File](GruntFile/index.html) level options can be applied.  
Consider the following scenario.  
Your using a document generator in your TypeScript project that allows for <code>&#91;&#91;include:somePath/somefile.md&#93;&#93;</code> type include statments to be replaced by file contents during the document generation process. This might be preferable when you need finer control over markdown of some comments.  
The down side to this approach is any `file.d.ts` types documents will contain <code>&#91;&#91;include:somePath/somefile.md&#93;&#93;</code> statments which may not be helpful for code completion help.  
Using a [Grunt File](GruntFile/index.html) configuraton can be helpful to transform your `file.d.ts` outputs to have <code>&#91;&#91;include:somePath/somefile.md&#93;&#93;</code> includes replaced with the actual markdown contents.

* [Options](Options/index.html)
* [Grunt File](GruntFile/index.html)
* [Misc](misc/index.html)
* [build-include](https://www.npmjs.com/package/build-include)