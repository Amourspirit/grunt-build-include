// #region imports
import { IBiGruntOpt, IMatchOpt, IBuildIncludeOpt, IGruntOptComment, IComment, IText, IGruntOptFence } from "./interfaces";
import * as mo from './matchOptions';
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
  match: {
    ...mo.matchBuildInclude
  }
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
      return mo.matchBracketInclude;
    case regexKind.buildIncludeHtml:
      return mo.matchBuildIncludeHtml;
    case regexKind.buildIncludePound:
      return mo.matchBuildIncludePound;
    case regexKind.buildIncludeSlash:
      return mo.matchBuildIncludeSlash;
    case regexKind.bracketIncludeMulti:
      return mo.matchBracketIncludeMulti;
    default:
      return mo.matchBuildInclude;
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
  const match: IMatchOpt = options.match;
  if (!match.kind) {
    match.kind = DEFAULT_MATCH_KIND;
  }
  const reKind = regexKind.parse(match.kind);

  const matchDefaults = getPerferedMatch(reKind);
  if (match.path === undefined) {
    match.path = matchDefaults.path;
  }
  if (match.name === undefined) {
    match.name = matchDefaults.name;
  }
  if (!match.fileName) {
    match.fileName = matchDefaults.fileName;
  }
  if (!match.options) {
    match.options = matchDefaults.options;
  }
  if (!match.parameters) {
    match.parameters = matchDefaults.parameters;
  }
  if (match.prefix === undefined) {
    match.prefix = matchDefaults.prefix;
  }
  if (match.suffix === undefined) {
    match.suffix = matchDefaults.suffix;
  }
  if (match.indexFile === undefined) {
    match.indexFile = 1;
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


  if (match.indexOptions === undefined) {
    match.indexOptions = 2;
  }
  // can be assignd from grunt file
  if (typeof match.indexOptions === 'string') {
    try {
      match.indexOptions = parseInt(match.indexOptions, 10);
    } catch (error) {
      grunt.log.warn(`Unable to parse match.indexOptions. Expected a whole number`);
      match.indexOptions = 2;
    }
    match.indexOptions = 2;
  }
  if (match.indexOptions < 2) {
    match.indexOptions = Math.abs(match.indexOptions);
  }
  match.indexOptions = Math.round(match.indexOptions);
  if (match.indexFile === match.indexOptions) {
    grunt.log.warn(`match.indexOptions and match.indexFile have the same value of '${match.indexOptions}'. This should never be the case!`);
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
  hasOpt = mergeBiComments(currentBiOpt, currentGruntOptions) || hasOpt;
  hasOpt = mergeBiText(currentBiOpt, currentGruntOptions) || hasOpt;
  hasOpt = mergeBiBreakString(currentBiOpt, currentGruntOptions) || hasOpt;
  hasOpt = mergeBiFence(currentBiOpt, currentGruntOptions) || hasOpt;
  return hasOpt;
}
const mergeBiComments = (biOpt: IBuildIncludeOpt, currentGruntOptions: IBiGruntOpt): boolean => {
  const c = currentGruntOptions.comment;
  let hasOpt: boolean = false;
  if (c) {
    if (biOpt.comment.padLeftAssigned === false && c.padleft !== undefined) {
      biOpt.comment.padLeft = c.padleft;
      biOpt.comment.padLeftAssigned = true;
      biOpt.comment.isSet = true;
      hasOpt = true;
    }
    if (biOpt.comment.type === commentKind.none && c.type !== undefined) {
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
    biOpt.bs.isSet = true;
    hasOpt = true;
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
    if (bs.lineEnd) {
      if (typeof bs.lineEnd === 'number') {
        // parse just in case not a correct number
        biOpt.bs.lineEnd = Util.ParseEnumLnEndOpt(bs.lineEnd);
      } else {
        biOpt.bs.lineEnd = Util.ParseEnumLnEndOpt(bs.lineEnd.toString());
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
  }
  return hasOpt;
}
const mergeBiText = (biOpt: IBuildIncludeOpt, currentGruntOptions: IBiGruntOpt): boolean => {
  const txt = currentGruntOptions.text;
  let hasOpt: boolean = false;
  if (txt) {
    if (biOpt.text.after.length === 0 && txt.after !== undefined) {
      biOpt.text.after = txt.after.toString();
      biOpt.text.isSet = true;
      hasOpt = true;
    }
    if (biOpt.text.before.length === 0 && txt.before !== undefined) {
      biOpt.text.before = txt.before.toString();
      biOpt.text.isSet = true;
      hasOpt = true;
    }
    if (biOpt.text.code === eKind.none && txt.code !== undefined) {
      biOpt.text.code = eKind.parse(txt.code.toString());
      if (biOpt.text.code > eKind.none) {
        biOpt.text.isSet = true;
        hasOpt = true;
      }
    }
    if (biOpt.text.codeKind === eProcess.none && txt.codekind !== undefined) {
      biOpt.text.codeKind = eProcess.parse(txt.codekind.toString());
      if (biOpt.text.codeKind > eProcess.none) {
        biOpt.text.isSet = true;
        hasOpt = true;
      }
    }
    if (biOpt.text.whiteSpaceLine === whiteSpLn.noAction && txt.whiteSpaceLine !== undefined) {
      biOpt.text.whiteSpaceLine = whiteSpLn.parse(txt.whiteSpaceLine.toString());
      if (biOpt.text.whiteSpaceLine > whiteSpLn.noAction) {
        biOpt.text.isSet = true;
        hasOpt = true;
      }
    }
    if (biOpt.text.noLineBreaks === false) {
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
    }
    if (biOpt.text.indent === false) {
      if (txt.indent !== undefined) {
        if (typeof txt.indent === 'string') {
          let s: string = txt.indent;
          s = s.toString().toLowerCase();
          if (s === 'true' || s === '1') {
            biOpt.text.indent = true;
            biOpt.text.isSet = true;
            hasOpt = true;
          }
        } else if (typeof txt.indent === 'boolean') {
          if (txt.indent === true) {
            biOpt.text.indent = true;
            biOpt.text.isSet = true;
            hasOpt = true;
          }
        }
      }
    }
    if (txt.padding !== undefined) {
      if (biOpt.text.padding.padLeftAssigned === false) {
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
      }
      if (biOpt.text.padding.padRigtAssigned === false) {
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
    hasOpt = true;
    biOpt.regexFence = reg;
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
export const getFenceOptions = (fence: string | IGruntOptFence | undefined): RegExp | undefined => {
  if (fence === undefined) {
    return undefined;
  }
  let fceKind = fenceKind.none;
  let localFence: IGruntOptFence | undefined;
  if (typeof fence === 'string') {
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