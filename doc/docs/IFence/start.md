Start of Fence.  
Can be string value such as:

    "```"

--or-- regular expression such as

    "/```(?:(?:$)|(?:[\r\n]+))/"  

When constructing a regular expressiong it must start with `/` and end with `/`; Otherwise, it will be treated as a string.  
**Do not** include options after regular expression.

Start and end are ignored if [type](/grunt-build-include/interfaces/src_modules.ifence.html#type) is set.  