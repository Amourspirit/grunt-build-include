# BUILD_INCLUDE

Options that may be used with **build_include** statements.  
In most cases it is recommended to use the [options](Options/) to set configuration options for a **build_include** statement.
This allows for fine control of how each **build_include** statement is processed.

Sometimes more of a global approach is perfered. In these cases [Grunt File](GruntFile/) level options can be applied.  
Consider the following scenario.  
Your using a document generator in your TypeScript project that allows for <code>&#91;include:somePath/somefile.md&#93;&#93;</code> type include statments to be replaced by file contents during the document generation process. This might be preferable when you need finer control over markdown of some comments.  
The down side to this approach is any `file.d.ts` types documents will contain <code>&#91;include:somePath/somefile.md&#93;&#93;</code> statments which may not be helpful for code completion help.  
Using a [Grunt File](GruntFile/) configuraton can be helpful to transform your `file.d.ts` outputs to have <code>&#91;include:somePath/somefile.md&#93;&#93;</code> includes replaced with the actual markdown contents.

* [Grunt File](GruntFile/)
* [Options](Options/)
* [Misc](misc/)