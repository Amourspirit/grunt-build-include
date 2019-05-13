/**
 * @module MatchOptions
 */
import { IMatchOpt } from "../interfaces";
/**
 * [[include:docs/matchOpt/matchOpt.md]]
 * 
 * This is the default matching option if not other matching options are specified.
 * 
 * [[include:docs/matchOpt/IMatchOpt.md]]
 * [[include:docs/enums/regexKind/buildInclude.md]]
 */
export class MatchBuildInclude implements IMatchOpt {
/**
 * [[include:docs/matchOpt/path.md]]
 * Default: empty string
 */
  public path: string;
/**
 * [[include:docs/matchOpt/name.md]]
 * Default: `BUILD_INCLUDE`
 */
  public name: string;
/**
 * [[include:docs/matchOpt/fileName.md]]
 * Default: `\((?:[ ]+)?(?:['"])?(.*?)(?:['"](?:[ ]+)?)?\)`
 * @see [[indexFile]]
 */
  public fileName: string;
/**
 * [[include:docs/matchOpt/parameters.md]]
 * Parameters are optinally matched for this class.
 * 
 * Default: `(?:(?:[\n\r]+)?\[(.*)\])?`
 */
  public parameters: string;
/**
 * [[include:docs/matchOpt/prefix.md]]
 * Default: `(?:(?:(?:\/\/)|(?:<\!\-\-)|(?:\/\*)|(?:\*))[ \t]*)`
 */
  public prefix: string;
/**
* [[include:docs/matchOpt/suffix.md]]
* Default: `(?:(?:[ \t]*\-\->)|(?:[ \t]*\*\/))?`
*/
  public suffix: string;
/**
 * [[include:docs/matchOpt/options.md]]
 * Default: `i`
 */
  public options: string;
/**
 * [[include:docs/matchOpt/kind.md]]
 * Default: `buildInclude`
 */
  public kind: string;
/**
* [[include:docs/matchOpt/matchFileIndex.md]]
* Default: `1`
*/
  public indexFile: number;
/**
* [[include:docs/matchOpt/matchParamIndex.md]]
* Default: `2`
*/
  public indexParam: number;
  public constructor() {
    this.path = '';
    this.name = 'BUILD_INCLUDE';
    this.fileName = `\\((?:[ ]+)?(?:['"])?(.*?)(?:['"](?:[ ]+)?)?\\)`;
    this.parameters = `(?:(?:[\\n\\r]+)?\\[(.*)\\])?`;
    this.prefix = `(?:(?:(?:\\/\\/)|(?:<\\!\\-\\-)|(?:\\/\\*)|(?:\\*))[ \\t]*)`;
    this.suffix = `(?:(?:[ \\t]*\\-\\->)|(?:[ \\t]*\\*\\/))?`;
    this.options = 'i';
    this.kind = 'buildInclude';
    this.indexFile = 1;
    this.indexParam = 2;
  }
}