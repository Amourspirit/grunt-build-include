##### Text Padright

`text?padright=num` where as `num` is any whole number number, pads the right side of each line with a number of spaces
equal to the value of `num`.  
--or--  
`text?padright=text` where as `text` is a string value, pads the right side of each line with the value of `text`.
Spaces at the end of `text` are valid. \t (tab) is also acceptable such as `text?padright=\t\t`, would add two tabs as right padding.  
If `padright` is a string value then be aware some strings require escaping.  
See: [Escaping Parameters](/pages/Docs/misc/EscapingParameters.html)  