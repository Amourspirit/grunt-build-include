>**before** - sets the text to append before the replacement file contents  
>**after**  - sets the text to append after the replacement file contents  
>**padleft**  - set padding string that will apply to the left of each line  
>**padright** - set padding string that willl apply to the right of each line  
>**kind** - set the encoding or decoding options
can be encode or decode
>&nbsp;&nbsp;`kind=encode` or `kind=0` - Encodes the replacement file contents  
>&nbsp;&nbsp;`kind=decode` or `kind=1` - Decodes the replacement file contents  

>**code** - the ekind of encoding or decodeing can be base64, base64uri, jsString, uri  
>&nbsp;&nbsp;`code=uri` or `code=0` - Encodes / Decodes the replacement file contents as URI  
>&nbsp;&nbsp;`code=uriComponent` or `code=1` - Encodes / Decodes the replacement file contents as uriComponent  
>&nbsp;&nbsp;`code=base64` or `code=2` - Encodes / Decodes the replacement file contents as base64  
>&nbsp;&nbsp;`code=base64Uri` or `code=3` - Encodes / Decodes the replacement file contents as base64Uri  
>&nbsp;&nbsp;`code=jsString` or `code=4` - Encodes / Decodes the replacement file contents as as JavaScript string  
>&nbsp;&nbsp;`code=tsString` or `code=5` - Encodes / Decodes the replacement file contents as as TypeScript string  