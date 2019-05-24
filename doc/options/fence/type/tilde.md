##### Fence Type Tilde

`type=tilde` Apply escape fencing options.  

Matches the pattern of:

````text
~~~
fenced text
~~~
````

--or--

````text
~~~text
fenced text
~~~
````

Will not match <code>&#126;&#126;&#126;</code> if not at the start of line.  
Will not match <code>&#126;&#126;&#126;   text</code> due to space after <code>&#126;&#126;&#126;</code> and before `text`.

See Also: [TildeFence](/grunt-build-include/classes/fences.tildefence.html)  