##### Text Padleft

`text?padleft=num` where as `num` is any whole number number, pads the left side of each line with a number of spaces
equal to the value of `num`.  
--or--  
`text?padleft=text` where as `text` is a string value, pads the left side of each line with the value of `text`.
Spaces at the end of `text` are valid. \t (tab) is also acceptable such as `text?padleft=\t\t`, would add two tabs as left padding.  
If `padleft` is a string value then be aware some strings require escaping.  
See: [Escaping Parameters](/pages/Docs/misc/EscapingParameters.html)  