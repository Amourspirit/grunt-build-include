[[include:docs/GruntOptions/match/match.md]]

When needed custom expressions can be written into a task using the `match` option.  
`match` follows the inteface [IMatchOpt](/interfaces/_modules_interfaces_.imatchopt.html).
Any omitted values are included from the values of default match [MatchBuildInclude](/classes/matchoptions.matchbuildinclude.html)  
It is also possible to merge current [matches](/enums/enums.regexkind.html) with new values.  
See <a href="#example05">example below</a>

**See Also:** [IBiGruntOpt](/interfaces/_modules_interfaces_.ibigruntopt.html)

[[include:docs/GruntOptions/match/example03.md]]
[[include:docs/enums/regexKind/buildIncludeSlash.md]]

[[include:docs/GruntOptions/match/example04.md]]
[[include:docs/enums/regexKind/buildIncludeSlash.md]]

[[include:docs/GruntOptions/match/example01.md]]

[[include:docs/GruntOptions/match/example02.md]]

<a name="example05"></a>  
[[include:docs/GruntOptions/match/example05.md]]

[Grunt File Options](../)  