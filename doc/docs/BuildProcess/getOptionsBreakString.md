> **width** - The width is the number of characters to for each line. Default is **80**  
>**break** - The options of how to split the replacement file contents.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Default value is **width**  
>&nbsp;&nbsp;`break=width` or `break=0` - Split by Width  
>&nbsp;&nbsp;`break=word` or `break=1` - Split by Word  
>&nbsp;&nbsp;`break=line` or `break=2` - Split by Line  
>**eol** - The options of how handle line endings of the replacement file contents.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Default value is **noLnBr**  
>&nbsp;&nbsp;`eol=none` or `eol=0` - Take no action  
>&nbsp;&nbsp;`eol=noLnBr` or `eol=1` - Remove all line breaks  
>&nbsp;&nbsp;`eol=encode` or `eol=2` - Encode line breaks as \n  