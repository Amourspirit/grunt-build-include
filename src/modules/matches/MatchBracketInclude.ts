/**
 * @module MatchOptions
 */
import { IMatchOpt } from "../interfaces";
/**
 * [[include:docs/matchOpt/matchOpt.md]]
 * [[include:docs/enums/regexKind/bracketInclude.md]]
 */
export class MatchBracketInclude implements IMatchOpt {
  /**
   * [[include:docs/matchOpt/path.md]]
   * Default: empty string
   */
  public path: string;
  /**
   * [[include:docs/matchOpt/name.md]]
   * Default: BUILD_INCLUDE
   */
  public name: string;
  /**
   * [[include:docs/matchOpt/fileName.md]]
   */
  public fileName: string;
  /**
   * [[include:docs/matchOpt/parameters.md]]
   * Parameters are optinally matched for this class.
   */
  public parameters: string;
  /**
   * [[include:docs/matchOpt/prefix.md]]
   */
  public prefix: string;
  /**
  * [[include:docs/matchOpt/suffix.md]]
  */
  public suffix: string;
  /**
   * [[include:docs/matchOpt/options.md]]
   */
  public options: string;
  /**
   * [[include:docs/matchOpt/kind.md]]
   */
  public kind: string;
  /**
  * [[include:docs/matchOpt/matchFileIndex.md]]
  */
  public indexFile: number;
  /**
  * [[include:docs/matchOpt/matchParamIndex.md]]
  */
  public indexParam: number;
  public constructor() {
    this.path = '';
    this.name = 'include:';
    this.fileName = `([^\\s].+)\\]\\]`;
    this.parameters = `(?:\\(([^\\s].*)\\))?`;
    this.prefix = `(?:\\[\\[)`;
    this.suffix = '';
    this.options = '';
    this.kind = 'bracketInclude';
    this.indexFile = 1;
    this.indexParam = 2;
  }
}