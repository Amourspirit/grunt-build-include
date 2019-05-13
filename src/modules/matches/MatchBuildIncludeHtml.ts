/**
 * @module MatchOptions
 */
import { IMatchOpt } from "../interfaces";
/**
 * [[include:docs/matchOpt/matchOpt.md]]
 * [[include:docs/matchOpt/IMatchOpt.md]]
 * [[include:docs/enums/regexKind/buildIncludeHtml.md]]
 */
export class MatchBuildIncludeHtml implements IMatchOpt {
  /**
   * [[include:docs/matchOpt/path.md]]
   * Default: empty string
   */
  public path: string;
  /**
   * [[include:docs/matchOpt/name.md]]
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
    this.name = 'BUILD_INCLUDE';
    this.fileName = `\\((?:[ ]+)?(?:['"])?(.*?)(?:['"](?:[ ]+)?)?\\)`;
    this.parameters = `(?:(?:[\\n\\r]+)?\\[(.*)\\])?`;
    this.prefix = `(?:<\\!\\-\\-[ \\t]*)`;
    this.suffix = `(?:[ \\t]*\\-\\->)`;
    this.options = 'i';
    this.kind = 'buildIncludeHtml';
    this.indexFile = 1;
    this.indexParam = 2;
  }
}