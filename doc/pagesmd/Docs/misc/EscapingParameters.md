Some parameters that can accept text as there value such `text?before=` and `text?after=` require escaps for literal values of the following.

Escapes are as follows:  

| character   |   escaped value  | URI escaped value |
|:-----------:|:----------------:|:-----------------:|
|     [       |       \\[        |       %5B         |
|     ]       |       \\]        |       %5D         |
|     &       |       \\&        |       %26         |
|     ,       |       \\,        |       %2C         |
|     =       |       \\=        |       %3D         |
|     \\      |       \\\\       |       %5C         |
|     \\n     |       \\\\n      |       %0A         |
|     \\r     |       \\\\r      |       %0D         |
|    \\r\\n   |      \\\\r\\\\n  |      %0D%0A       |
|     \\t     |       \\\\t      |        %X9        | 

Example: [Text Before After With Special Chars](/grunt-build-include/pages/examples/TextBeforeAfterWithSpecialChars.html)