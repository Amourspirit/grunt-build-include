// #region imports
import { IBiGruntOpt, IMatchOpt, IBuildIncludeOpt, IGruntOptFence } from "./interfaces";
// import * as mo from './matchOptions';
import { MatchBuildInclude } from "./matches/MatchBuildInclude";
import { MatchBuildIncludeHtml } from "./matches/MatchBuildIncludeHtml";
import { MatchBuildIncludePound } from "./matches/MatchBuildIncludePound";
import { MatchBuildIncludeSlash } from "./matches/MatchBuildIncludeSlash";
import { MatchBracketInclude } from "./matches/MatchBracketInclude";
import { MatchBracketIncludeMulti } from "./matches/MatchBracketIncludeMulti";
import { regexKind, commentKind, fenceKind, whiteSpLn } from './enums';
import * as grunt from 'grunt';
import { splitByOpt, lnEndOpt, widthFlags } from 'string-breaker';
import { eKind } from './enumEKind';
import { eProcess } from './enumEProcess';
import { Util } from './util';
import { StrictFence } from "./fences/StrictFence";
import { FlexFence } from "./fences/FlexFence";
import { TildeFence } from "./fences/TildeFence";
import { EscapeFence } from "./fences/EscapeFence";
// #endregion
// #regionn CONSTANTS
export const DEFAULT_MATCH_KIND = 'buildInclude';
export const DEFAULT_FENCE_START = `^{0}(?:([a-zA-Z]+)?(?:[\\r\\n]+))(?:[\\s\\S]+?)`;
export const DEFAULT_FENCE_END = `^{0}(?:(?:$)|(?:[\\r\\n]+))`;
// #endregion
// #region defaultOptions
/**
 * Default options for grunt options.
 * Implements: [[IBiGruntOpt]]
 */
export const defaultOptions: IBiGruntOpt = {
  /**
   * [[include:docs/GruntOptions/encoding.md]]
   */
  encoding: grunt.file.defaultEncoding,
  /**
   * [[include:docs/GruntOptions/process.md]]
   */
  process: false,
  /**
   * [[include:docs/GruntOptions/noProcess.md]]
   */
  noProcess: {},
  /**
  * Determins if recursion should be used.  
  * If recursion is true then build include files will be searched
  * for matches as alos replaced in a recursive manor.  
  * Default value is true.
  */
  recursion: true,
  /**
   * [[include:docs/GruntOptions/timestamp.md]]
   */
  timestamp: false,
  /**
   * [[include:docs/GruntOptions/mode.md]]
   */
  mode: false,
  /**
   * [[include:docs/GruntOptions/match.md]]
   */
  match: new MatchBuildInclude()
}
// #endregion
// #region getPerferedMatch
/**
 * Gets a set of regex rules as the current rules.
 * These rules are determinde in grung file by setting options in the
 * following manor:
 * @example
```js

build_include: {
  default: {
    options: {
      match: {
        kind: 'buildInclude',
      }
    }
  }
}
```
 * @param kind Enum to that determins which regex pattern to use
 */
const getPerferedMatch = (kind: regexKind): IMatchOpt => {
  switch (kind) {
    case regexKind.bracketInclude:
      return new MatchBracketInclude();
    case regexKind.buildIncludeHtml:
      return new MatchBuildIncludeHtml();
    case regexKind.buildIncludePound:
      return new MatchBuildIncludePound();
    case regexKind.buildIncludeSlash:
      return new MatchBuildIncludeSlash();
    case regexKind.bracketIncludeMulti:
      return new MatchBracketIncludeMulti();
    default:
      return new MatchBuildInclude();
  }
}
// #endregion
// #region getMatchOptions
/**
 * Sets that match options from current grunt options and assigns any missing values that
 * may of been ommited in the grunt file configuration.
 * @param options current grunt options.
 */
export const setMatchOptions = (options: IBiGruntOpt): void => {
  // const options: IBiGruntOpt = grunt.task.current.options(defaultOptions);
  let reKind: regexKind;
  // if grunt file match is set as string or number then parse it as regex value
  if (typeof options.match === 'string' || typeof options.match === 'number') {
    reKind = regexKind.parse(options.match.toString());
    options.match = getPerferedMatch(reKind);
    return;
  }
  if (typeof options.match !== 'object') {
    grunt.log.error(`Expected match to be string, number or object`);
    options.match = getPerferedMatch(regexKind.buildInclude);
    return;
  }
  const match: IMatchOpt = options.match;
  if (!match.kind) {
    match.kind = DEFAULT_MATCH_KIND;
  }
  reKind = regexKind.parse(match.kind);

  const matchDefaults = getPerferedMatch(reKind);
  if (match.path === undefined) {
    match.path = matchDefaults.path;
  } else if (typeof match.path !== 'string') {
    grunt.log.error(`Expected type string for match.path`);
    // throw new TypeError(`Expected type string for match.path`);
  }
  if (match.name === undefined) {
    match.name = matchDefaults.name;
  } else if (typeof match.name !== 'string') {
    grunt.log.error(`Expected type string for match.name`);
    // throw new TypeError(`Expected type string for match.name`);
  }
  if (!match.fileName) {
    match.fileName = matchDefaults.fileName;
  } else if (typeof match.fileName !== 'string') {
    grunt.log.error(`Expected type string for match.nfileNameame`);
    // throw new TypeError(`Expected type string for match.nfileNameame`);
  }
  if (!match.options) {
    match.options = matchDefaults.options;
  } else if (typeof match.options !== 'string') {
    grunt.log.error(`Expected type string for match.options`);
    // throw new TypeError(`Expected type string for match.options`);
  }
  if (!match.parameters) {
    match.parameters = matchDefaults.parameters;
  } else if (typeof match.parameters !== 'string') {
    grunt.log.error(`Expected type string for match.parameters`);
    // throw new TypeError(`Expected type string for match.parameters`);
  }
  if (match.prefix === undefined) {
    match.prefix = matchDefaults.prefix;
  } else if (typeof match.prefix !== 'string') {
    grunt.log.error(`Expected type string for match.prefix`);
    // throw new TypeError(`Expected type string for match.prefix`);
  }
  if (match.suffix === undefined) {
    match.suffix = matchDefaults.suffix;
  } else if (typeof match.suffix !== 'string') {
    grunt.log.error(`Expected type string for match.suffix`);
    // throw new TypeError(`Expected type string for match.suffix`);
  }
  if (match.indexFile === undefined) {
    match.indexFile = 1;
  } else if (typeof match.indexFile !== 'number' && typeof match.indexFile !== 'string') {
    grunt.log.error(`Expected type number for match.indexFile`);
    // throw new TypeError(`Expected type number for match.indexFile`);
  }
  if (match.indexParam === undefined) {
    match.indexParam = matchDefaults.indexParam;
  } else if (typeof match.indexParam !== 'number' && typeof match.indexParam !== 'string') {
    grunt.log.error(`Expected type number for match.indexParam`);
    // throw new TypeError(`Expected type number for match.indexParam`);
  }
  // can be assignd from grunt file
  if (typeof match.indexFile === 'string') {
    try {
      match.indexFile = parseInt(match.indexFile, 10);
    } catch (error) {
      grunt.log.warn(`Unable to parse match.indexFile. Expected a whole number`);
      match.indexFile = 1;
    }
    match.indexFile = 1;
  }
  if (match.indexFile < 1) {
    match.indexFile = Math.abs(match.indexFile);
  }
  match.indexFile = Math.round(match.indexFile);

  // can be assignd from grunt file
  if (typeof match.indexParam === 'string') {
    try {
      match.indexParam = parseInt(match.indexParam, 10);
    } catch (error) {
      grunt.log.warn(`Unable to parse match.indexOptions. Expected a whole number`);
      match.indexParam = 2;
    }
    match.indexParam = 2;
  }
  if (match.indexParam < 2) {
    match.indexParam = Math.abs(match.indexParam);
  }
  match.indexParam = Math.round(match.indexParam);
  if (match.indexFile === match.indexParam) {
    grunt.log.warn(`match.indexOptions and match.indexFile have the same value of '${match.indexParam}'. This should never be the case!`);
  }
  options.match = match;
}
// #endregion
// #region getOptionsDefault
/**
 * Gets the default options
 */
export const getBiOptionsDefault = (): IBuildIncludeOpt => {
  const biOpt: IBuildIncludeOpt = {
    bs: {
      break: splitByOpt.width,
      lineEnd: lnEndOpt.noLnBr,
      width: 80,
      flags: widthFlags.none,
      isSet: false
    },
    asJsString: false,
    comment: {
      type: commentKind.none,
      padLeft: 0,
      padLeftAssigned: false,
      isSet: false
    },
    text: {
      before: '',
      after: '',
      padding: {
        padLeftAssigned: false,
        padRigtAssigned: false,
        padLeft: 0,
        padRight: 0,
      },
      code: eKind.none,
      codeKind: eProcess.none,
      noLineBreaks: false,
      whiteSpaceLine: whiteSpLn.noAction,
      indent: false,
      isSet: false,
      isCode: false
    },
    fence: {
      type: fenceKind.none,
      start: '',
      end: '',
      remove: false
    },
    lines: [],
    opt: {}
  };
  return biOpt;
}
// #endregion
/**
 * Merges Options together giving priority to `currentBiOpt`
 * @param currentBiOpt Current internal Options
 * @param currentGruntOptions Current grunt file options
 * @returns Returns `true` if there any options are merged; Otherwise, `false`
 */
export const biMergeOptions = (currentBiOpt: IBuildIncludeOpt, currentGruntOptions: IBiGruntOpt): boolean => {
  let hasOpt: boolean = false;
  hasOpt = mergeAsJsString(currentBiOpt, currentGruntOptions) || hasOpt;
  hasOpt = mergeBiComments(currentBiOpt, currentGruntOptions) || hasOpt;
  hasOpt = mergeBiText(currentBiOpt, currentGruntOptions) || hasOpt;
  hasOpt = mergeBiBreakString(currentBiOpt, currentGruntOptions) || hasOpt;
  hasOpt = mergeBiFence(currentBiOpt, currentGruntOptions) || hasOpt;
  return hasOpt;
}
const gruntOptHasOverride = (currentGruntOptions: IBiGruntOpt): boolean => {
  let override: boolean = false;
  const ov = currentGruntOptions.override;
  if (ov && typeof ov === 'boolean') {
    override = ov;
  }
  return override;
}
const mergeAsJsString = (biOpt: IBuildIncludeOpt, currentGruntOptions: IBiGruntOpt): boolean => {
  let hasOpt: boolean = false;
  const asjs = currentGruntOptions.asJsString;
  if (typeof asjs === 'boolean') {
    const ov: boolean = gruntOptHasOverride(currentGruntOptions);
    if (biOpt.asJsString === false || ov === true) {
      biOpt.asJsString = asjs;
      hasOpt = true;
    }
  }
  return hasOpt;
}
const mergeBiComments = (biOpt: IBuildIncludeOpt, currentGruntOptions: IBiGruntOpt): boolean => {
  const c = currentGruntOptions.comment;
  let hasOpt: boolean = false;
  if (c) {
    const ov: boolean = gruntOptHasOverride(currentGruntOptions);
    if ((biOpt.comment.padLeftAssigned === false || ov === true) && c.padleft !== undefined) {
      biOpt.comment.padLeft = c.padleft;
      biOpt.comment.padLeftAssigned = true;
      biOpt.comment.isSet = true;
      hasOpt = true;
    }
    if ((biOpt.comment.type === commentKind.none || ov === true) && c.type !== undefined) {
      biOpt.comment.type = commentKind.parse(c.type);
      if (biOpt.comment.type > commentKind.none) {
        biOpt.comment.isSet = true;
        hasOpt = true;
      }
    }
  }
  return hasOpt;
}
const mergeBiBreakString = (biOpt: IBuildIncludeOpt, currentGruntOptions: IBiGruntOpt): boolean => {
  const bs = currentGruntOptions.breakstring;
  let hasOpt: boolean = false;
  if (bs) {
    const ov: boolean = gruntOptHasOverride(currentGruntOptions);
    if (biOpt.bs.isSet === false || ov === true) {
      if (typeof bs === 'number') {
        biOpt.bs.width = Math.abs(Math.round(bs));
        biOpt.bs.isSet = true;
        hasOpt = true;
      } else if (typeof bs === 'object') {
        if (bs.break) {
          if (typeof bs.break === 'number') {
            // parse just in case not a correct number
            biOpt.bs.break = Util.ParseEnumSplitByOpt(bs.break);
          } else {
            biOpt.bs.break = Util.ParseEnumSplitByOpt(bs.break.toString());
          }
        }
        if (bs.flags) {
          let v: string = bs.flags.toString();
          if (v.length > 0) {
            v = v.toLowerCase();
            if (v === 'word') {
              biOpt.bs.flags = widthFlags.nearestWord;
            }
          }
        }
        if (bs.eol) {
          if (typeof bs.eol === 'number') {
            // parse just in case not a correct number
            biOpt.bs.lineEnd = Util.ParseEnumLnEndOpt(bs.eol);
          } else {
            biOpt.bs.lineEnd = Util.ParseEnumLnEndOpt(bs.eol.toString());
          }
        }
        if (bs.width) {
          if (typeof bs.width === 'number') {
            biOpt.bs.width = Math.round(Math.abs(bs.width));
          } else {
            const num: number = parseInt(bs.width.toString(), 10);
            if (isNaN(num) === false) {
              biOpt.bs.width = Math.round(Math.abs(num));
            }
          }
        }
        biOpt.bs.isSet = true;
        hasOpt = true;
      }
    }
  }
  return hasOpt;
}
const mergeBiText = (biOpt: IBuildIncludeOpt, currentGruntOptions: IBiGruntOpt): boolean => {
  const txt = currentGruntOptions.text;
  let hasOpt: boolean = false;
  if (txt) {
    const ov: boolean = gruntOptHasOverride(currentGruntOptions);
    if (biOpt.text.isSet === false || ov === true) {
      if (txt.after !== undefined) {
        biOpt.text.after = txt.after.toString();
        biOpt.text.isSet = true;
        hasOpt = true;
      }
      if (txt.before !== undefined) {
        biOpt.text.before = txt.before.toString();
        biOpt.text.isSet = true;
        hasOpt = true;
      }
      if (txt.code !== undefined) {
        biOpt.text.code = eKind.parse(txt.code.toString());
        if (biOpt.text.code > eKind.none) {
          biOpt.text.isSet = true;
          hasOpt = true;
        }
      }
      if (txt.codekind !== undefined) {
        biOpt.text.codeKind = eProcess.parse(txt.codekind.toString());
        if (biOpt.text.codeKind > eProcess.none) {
          biOpt.text.isSet = true;
          hasOpt = true;
        }
      }
      if (txt.whiteSpaceLine !== undefined) {
        biOpt.text.whiteSpaceLine = whiteSpLn.parse(txt.whiteSpaceLine.toString());
        if (biOpt.text.whiteSpaceLine > whiteSpLn.noAction) {
          biOpt.text.isSet = true;
          hasOpt = true;
        }
      }
      if (txt.nolinebreaks !== undefined) {
        if (typeof txt.nolinebreaks === 'string') {
          let s: string = txt.nolinebreaks;
          s = s.toString().toLowerCase();
          if (s === 'true' || s === '1') {
            biOpt.text.noLineBreaks = true;
            biOpt.text.isSet = true;
            hasOpt = true;
          }
        } else if (typeof txt.nolinebreaks === 'boolean') {
          if (txt.nolinebreaks === true) {
            biOpt.text.noLineBreaks = true;
            biOpt.text.isSet = true;
            hasOpt = true;
          }
        }
      }
      if (txt.indent !== undefined) {
        if (typeof txt.indent === 'string') {
          let s: string = txt.indent;
          s = s.toString().toLowerCase();
          if (s === 'true' || s === '1') {
            biOpt.text.indent = true;
            biOpt.text.isSet = true;
            hasOpt = true;
          } else if (s === 'false' || s === '0') {
            biOpt.text.indent = false;
            biOpt.text.isSet = true;
            hasOpt = true;
          }
        } else if (typeof txt.indent === 'boolean') {
          biOpt.text.indent = txt.indent;
          biOpt.text.isSet = true;
          hasOpt = true;
        }
      }
      if (txt.padding !== undefined) {
        if (txt.padding.padleft !== undefined) {
          if (typeof txt.padding.padleft === 'number') {
            biOpt.text.padding.padLeft = txt.padding.padleft;
          } else {
            biOpt.text.padding.padLeft = txt.padding.padleft.toString();
          }
          biOpt.text.padding.padLeftAssigned = true;
          biOpt.text.isSet = true;
          hasOpt = true;
        }
        if (txt.padding.padright !== undefined) {
          if (typeof txt.padding.padright === 'number') {
            biOpt.text.padding.padRight = txt.padding.padright;
          } else {
            biOpt.text.padding.padRight = txt.padding.padright.toString();
          }
          biOpt.text.padding.padRigtAssigned = true;
          biOpt.text.isSet = true;
          hasOpt = true;
        }
      }
    }
  }
  return hasOpt;
}
const mergeBiFence = (biOpt: IBuildIncludeOpt, currentGruntOptions: IBiGruntOpt): boolean => {
  if (biOpt.regexFence) {
    return false;
  }
  let hasOpt: boolean = false;
  const reg: RegExp | undefined = getFenceOptions(currentGruntOptions.fence);
  if (reg) {
    const ov: boolean = gruntOptHasOverride(currentGruntOptions);
    if (biOpt.regexFence === undefined || ov === true) {
      hasOpt = true;
      biOpt.regexFence = reg;
    }
  }
  return hasOpt;
}
/**
 * Gets a fence that it has has a start and end that can be used to
 * build a regular expression for processing fences in text.
 * @param kind The kind of fence to return
 */
export const getFenceKind = (kind: fenceKind): IGruntOptFence | undefined => {
  switch (kind) {
    case fenceKind.strict:
      return new StrictFence();
    case fenceKind.flex:
      return new FlexFence();
    case fenceKind.escape:
      return new EscapeFence();
    case fenceKind.tilde:
      return new TildeFence();
    default:
      return undefined;
  }
}
/**
 * Creates a regular expression from fence.
 * The regular expression is used to match fences in content.
 * 
 * Example Fenced text:  
 * 
 *     ```text  
 *     This text is fenced  
 *     ```
 *
 * @param fence [[fenceKind]] enumeration value or object instance of [[IGruntOptFence]]
 * or `undefined`.
 * 
 * If fence is string then it is parsed as [[fenceKind]].
 * If fence is `undefined` then return result will also be `undefined`.
 * @returns If fence can be converted to regular expression then a regular
 * expression is returned; Otherwise, `undefined`.
 */
export const getFenceOptions = (fence: string | number | IGruntOptFence | undefined): RegExp | undefined => {
  if (fence === undefined) {
    return undefined;
  }
  let fceKind = fenceKind.none;
  let localFence: IGruntOptFence | undefined;
  if (typeof fence === 'string' || typeof fence === 'number') {
    fceKind = fenceKind.parse(fence);
    localFence = getFenceKind(fceKind);
    if (localFence === undefined) {
      return undefined;
    }
  }

  if (typeof fence === 'object') {
    // if any properties are missing defalut to to strictFence
    const standInFence = new StrictFence();
    let hasProp: boolean = false;
    if (fence.hasOwnProperty('start')) {
      hasProp = true;
      standInFence.start = fence.start;
    }
    if (fence.hasOwnProperty('end')) {
      hasProp = true;
      standInFence.end = fence.end;
    }
    if (hasProp === true) {
      localFence = standInFence;
    }
  }
  if (localFence === undefined) {
    return undefined;
  }

  // we ahve a IFence instance to work with
  let regStart: RegExp | undefined;
  if (typeof localFence.start === 'string') {
    /// expect simple fence start such as ```
    if (localFence.start.length === 0) {
      return undefined;
    }
    regStart = new RegExp(DEFAULT_FENCE_START.replace('{0}', Util.EscapeRegex(localFence.start)));
  }
  // can't use typeof here as typeof regex is object
  // see: https://stackoverflow.com/questions/4339288/typeof-for-regexp
  if (localFence.start instanceof RegExp) {
    regStart = localFence.start;
  }
  // without start no sense in continuing
  if (regStart === undefined) {
    return undefined;
  }

  let regEnd: RegExp | undefined;
  if (typeof localFence.end === 'string') {
    /// expect simple fence start such as ```
    if (localFence.end.length === 0) {
      return undefined;
    }
    regEnd = new RegExp(DEFAULT_FENCE_END.replace('{0}', Util.EscapeRegex(localFence.end)));
  }
  // can't use typeof here as typeof regex is object
  // see: https://stackoverflow.com/questions/4339288/typeof-for-regexp
  if (localFence.end instanceof RegExp) {
    regEnd = localFence.end;
  }
  // without end no sense in continuing
  if (regEnd === undefined) {
    return undefined;
  }
  // use multiline
  const result: RegExp = new RegExp(`(${regStart.source}${regEnd.source})`, 'm');
  return result;
}