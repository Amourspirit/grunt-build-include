import { IMatchOpt } from "./interfaces";
/**
 * [[include:docs/matchOpt/matchOpt.md]]
 * [[include:docs/matchOpt/IMatchOpt.md]]
 * [[include:docs/enums/regexKind/buildInclude.md]]
 */
export const matchBuildInclude: IMatchOpt = {
  /**
   * [[include:docs/matchOpt/path.md]]
   * Default: empty string
   */
  path: '',
  /**
   * [[include:docs/matchOpt/name.md]]
   * Default: BUILD_INCLUDE
   */
  name: 'BUILD_INCLUDE',
  /**
   * [[include:docs/matchOpt/fileName.md]]
   */
  fileName: `\\((?:[ ]+)?(?:['"])?(.*?)(?:['"](?:[ ]+)?)?\\)`,
  /**
   * [[include:docs/matchOpt/parameters.md]]
   */
  parameters: `(?:(?:[\\n\\r]+)?\\[(.*)\\])?`,
  /**
   * [[include:docs/matchOpt/prefix.md]]
   */
  prefix: `(?:(?:(?:\\/\\/)|(?:<\\!\\-\\-)|(?:\\/\\*)|(?:\\*))[ \\t]*)`,
  /**
   * [[include:docs/matchOpt/suffix.md]]
   */
  suffix: `(?:(?:[ \\t]*\\-\\->)|(?:[ \\t]*\\*\\/))?`,
  /**
   * [[include:docs/matchOpt/options.md]]
   */
  options: 'i',
  /**
   * [[include:docs/matchOpt/kind.md]]
   */
  kind: 'buildInclude',
  /**
   * [[include:docs/matchOpt/matchFileIndex.md]]
   */
  indexFile: 1,
  /**
  * [[include:docs/matchOpt/matchOptionsIndex.md]]
  */
  indexOptions: 2
}
/**
 * [[include:docs/matchOpt/matchOpt.md]]
 * [[include:docs/matchOpt/IMatchOpt.md]]
 * [[include:docs/enums/regexKind/buildIncludeHtml.md]]
 */
export const matchBuildIncludeHtml: IMatchOpt = {
  /**
   * [[include:docs/matchOpt/path.md]]
   * Default: empty string
   */
  path: '',
  /**
   * [[include:docs/matchOpt/name.md]]
   * Default: BUILD_INCLUDE
   */
  name: 'BUILD_INCLUDE',
  /**
   * [[include:docs/matchOpt/fileName.md]]
   */
  fileName: `\\((?:[ ]+)?(?:['"])?(.*?)(?:['"](?:[ ]+)?)?\\)`,
  /**
   * [[include:docs/matchOpt/parameters.md]]
   */
  parameters: `(?:(?:[\\n\\r]+)?\\[(.*)\\])?`,
  /**
   * [[include:docs/matchOpt/prefix.md]]
   */
  prefix: `(?:<\\!\\-\\-[ \\t]*)`,
  /**
   * [[include:docs/matchOpt/suffix.md]]
   */
  suffix: `(?:[ \\t]*\\-\\->)`,
  /**
   * [[include:docs/matchOpt/options.md]]
   */
  options: 'i',
  /**
   * [[include:docs/matchOpt/kind.md]]
   */
  kind: 'buildIncludeHtml',
  /**
   * [[include:docs/matchOpt/matchFileIndex.md]]
   */
  indexFile: 1,
  /**
  * [[include:docs/matchOpt/matchOptionsIndex.md]]
  */
  indexOptions: 2
}
/**
 * [[include:docs/matchOpt/matchOpt.md]]
 * [[include:docs/matchOpt/IMatchOpt.md]]
 * [[include:docs/enums/regexKind/buildIncludePound.md]]
 */
export const matchBuildIncludePound: IMatchOpt = {
  /**
   * [[include:docs/matchOpt/path.md]]
   * Default: empty string
   */
  path: '',
  /**
   * [[include:docs/matchOpt/name.md]]
   * Default: BUILD_INCLUDE
   */
  name: 'BUILD_INCLUDE',
  /**
   * [[include:docs/matchOpt/fileName.md]]
   */
  fileName: `\\((?:[ ]+)?(?:['"])?(.*?)(?:['"](?:[ ]+)?)?\\)`,
  /**
   * [[include:docs/matchOpt/parameters.md]]
   */
  parameters: `(?:(?:[\\n\\r]+)?\\[(.*)\\])?`,
  /**
   * [[include:docs/matchOpt/prefix.md]]
   */
  prefix: `(?:#[ \\t]*)`,
  /**
   * [[include:docs/matchOpt/suffix.md]]
   * Default: empty string
   */
  suffix: '',
  /**
   * [[include:docs/matchOpt/options.md]]
   */
  options: 'i',
  /**
   * [[include:docs/matchOpt/kind.md]]
   */
  kind: 'buildIncludePound',
  /**
   * [[include:docs/matchOpt/matchFileIndex.md]]
   */
  indexFile: 1,
  /**
  * [[include:docs/matchOpt/matchOptionsIndex.md]]
  */
  indexOptions: 2
}
/**
 * [[include:docs/matchOpt/matchOpt.md]]
 * [[include:docs/matchOpt/IMatchOpt.md]]
 * [[include:docs/enums/regexKind/buildIncludeSlash.md]]
 */
export const matchBuildIncludeSlash: IMatchOpt = {
  /**
   * [[include:docs/matchOpt/path.md]]
   * Default: empty string
   */
  path: '',
  /**
   * [[include:docs/matchOpt/name.md]]
   * Default: BUILD_INCLUDE
   */
  name: 'BUILD_INCLUDE',
  /**
   * [[include:docs/matchOpt/fileName.md]]
   */
  fileName: `\\((?:[ ]+)?(?:['"])?(.*?)(?:['"](?:[ ]+)?)?\\)`,
  /**
   * [[include:docs/matchOpt/parameters.md]]
   */
  parameters: `(?:(?:[\\n\\r]+)?\\[(.*)\\])?`,
  /**
   * [[include:docs/matchOpt/prefix.md]]
   */
  prefix: `(?:\\/\\/[ \\t]*)`,
  /**
   * [[include:docs/matchOpt/suffix.md]]
   * Default: empty string
   */
  suffix: '',
  /**
   * [[include:docs/matchOpt/options.md]]
   */
  options: 'i',
  /**
   * [[include:docs/matchOpt/kind.md]]
   */
  kind: 'buildIncludeSlash',
  /**
   * [[include:docs/matchOpt/matchFileIndex.md]]
   */
  indexFile: 1,
  /**
  * [[include:docs/matchOpt/matchOptionsIndex.md]]
  */
  indexOptions: 2
}
/**
 * [[include:docs/matchOpt/matchOpt.md]]
 * [[include:docs/enums/regexKind/bracketInclude.md]]
 */
export const matchBracketInclude: IMatchOpt = {
  /**
   * [[include:docs/matchOpt/path.md]]
   * Default: empty string
   */
  path: '',
  /**
   * [[include:docs/matchOpt/name.md]]
   */
  name: 'include:',
  /**
   * [[include:docs/matchOpt/fileName.md]]
   */
  fileName: `([^\\s].+)\\]\\]`,
  /**
   * [[include:docs/matchOpt/parameters.md]]
   */
  parameters: `(?:\\(([^\\s].*)\\))?`,
  /**
   * [[include:docs/matchOpt/prefix.md]]
   */
  prefix: `(?:\\[\\[)`,
  /**
   * [[include:docs/matchOpt/suffix.md]]
   * Default: empty string
   */
  suffix: '',
  /**
   * [[include:docs/matchOpt/options.md]]
   * Default: empty string
   */
  options: '',
  /**
   * [[include:docs/matchOpt/kind.md]]
   */
  kind: 'bracketInclude',
  /**
   * [[include:docs/matchOpt/matchFileIndex.md]]
   */
  indexFile: 1,
  /**
  * [[include:docs/matchOpt/matchOptionsIndex.md]]
  */
  indexOptions: 2
}
/**
 * [[include:docs/matchOpt/matchOpt.md]]
 * [[include:docs/enums/regexKind/bracketIncludeMulti.md]]
 */
export const matchBracketIncludeMulti: IMatchOpt = {
  /**
   * [[include:docs/matchOpt/path.md]]
   * Default: empty string
   */
  path: '',
  /**
   * [[include:docs/matchOpt/name.md]]
   */
  name: 'include:',
  /**
   * [[include:docs/matchOpt/fileName.md]]
   */
  fileName: `([^\\s].+)\\]\\]`,
  /**
   * [[include:docs/matchOpt/parameters.md]]
   */
  parameters: `(?:\\(([^\\s].*)\\))?`,
  /**
   * [[include:docs/matchOpt/prefix.md]]
   */
  prefix: `(?:(?:(?:\\*)|(?:\\/\\/))[ \\t]*)?(?:\\[\\[)`,
  /**
   * [[include:docs/matchOpt/suffix.md]]
   * Default: empty string
   */
  suffix: '',
  /**
   * [[include:docs/matchOpt/options.md]]
   * Default: empty string
   */
  options: '',
  /**
   * [[include:docs/matchOpt/kind.md]]
   */
  kind: 'bracketIncludeMulti',
  /**
   * [[include:docs/matchOpt/matchFileIndex.md]]
   */
  indexFile: 1,
  /**
  * [[include:docs/matchOpt/matchOptionsIndex.md]]
  */
  indexOptions: 2
}