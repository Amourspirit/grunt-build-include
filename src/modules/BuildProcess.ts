// #region imports
import { codeString } from 'multi-encoder';
import { eKind, eKindType } from "./enumEKind";
import { eProcess, eProcessType } from "./enumEProcess";
import {
  IBuildIncludeOpt,
  IMatchOpt,
  IBiGruntOpt,
  IMatchType,
  IFence,
  IGruntOptFence,
  IMatchItemWsItm
} from "./interfaces";
import {
  stringBreaker,
  splitByOpt,
  lnEndOpt,
  widthFlags
} from 'string-breaker';
import {
  commentKind,
  matchKind,
  fenceKind,
  whiteSpLn
} from "./enums";
import { 
  setMatchOptions,
  getBiOptionsDefault,
  defaultOptions,
  biMergeOptions,
  DEFAULT_FENCE_START,
  DEFAULT_FENCE_END,
  getFenceKind,
  getFenceOptions
} from './defaultOptions';
import { Util } from './util';
import * as grunt from 'grunt';
import { StrictFence } from './fences/StrictFence';
import { TildeFence } from './fences/TildeFence';
import { EscapeFence } from './fences/EscapeFence';
import { MatchItem } from './MatchItem';
import { EOL } from 'os';
// #endregion

/**
 * Class that does all the work of replacing BUILD_INCLUDE statments in a files contents.
 */
export class BuildProcess {
  // #region Properties
  /**
   * When true verbose logging will take place.
   * State is determined by grunt. If grunt --verbose then value will be true
   */
  private verbose: boolean;
  /** Boolean flag that is true if running in windows; Otherwise, false */
  private isWindows: boolean;
  // #endregion
  // #region constructor
  /**
   * Constructs a new instace of class
   */
  public constructor() {
    this.isWindows = process.platform === 'win32';
    this.verbose = grunt.option('verbose') ? true : false;;
  }
  // #endregion

  // #region buildInclude
  /**
   * Reads BUILD_INCLUDE statements in contenst and replaces the
   * BUILD_INCLUDE statment base upon the parameters in the BUILD_INCLUDE statment.
   * @description
   * [[include:docs/BuildProcess/buildInclude.md]]
   * @param contents The string to search and replace BUILD_INCLUDE statements
   * @param srcpath The source path of the contents
   */
  public buildInclude(contents: string, srcpath: string): string {
    // for unkown reason grunt.task.current.options() becomes undefined
    // in windows with debugging one of the test gruntfiles. All test still
    // pass just not when debug using call-grunt.js. This works fine in linux.
    const options: IBiGruntOpt = grunt.task.current.options(defaultOptions);
    // merge any unset options with potential match options in grunt
    setMatchOptions(options);

    // this should never be able to happen because setMatchOptions
    // takes care of this condition already and returns default match options
    // if there is an error.
    // this block is here because typescript would argue otherwise.
    if (typeof options.match !== 'object') {
      grunt.log.error(`Expected match to be string, number or object`);
      return contents;
    }
    // capture if options.suffix contain a ^ (start of line value)
    let allowIndent = true;
    if (options.match.prefix.indexOf('^') >= 0) {
      allowIndent = false;
    }

    const optMatch: IMatchOpt = options.match;

    if (!optMatch.name) {
      grunt.log.write('GRUNT-BUILD-INCLUDE: ');
      grunt.log.writeln(` options.match.name is missing`);
      return contents;
    }
    const nameRegex = new RegExp(`${optMatch.prefix}${optMatch.name}`, optMatch.options);
    if (nameRegex.exec(contents)) {
      if (srcpath && srcpath.length > 0) {
        grunt.log.write('GRUNT-BUILD-INCLUDE: ');
        grunt.log.writeln(` [${srcpath}] has ${optMatch.name}:`);
      }

      // https://regexr.com/4cjvh
      // https://regexr.com/4d14r revised April 27, 2019
      // const re = /(?:(?:\/\/)|(?:<\!\-\-)|(?:\/\*))[ \t]*BUILD_INCLUDE\((?:[ ]+)?(?:['"])?(.*?)(?:['"](?:[ ]+)?)?\)(?:(?:[\n\r]+)?\[(.*)\])?(?:(?:[ \t]*\-\->)|(?:[ \t]*\*\/))?/i;
      
      let indexFile: number;
      let indexOpt: number;
      let indexOrigMatch: number;
      const indexIndent: number = 1;
      if (allowIndent === true) {
        // match[1] will be the padding
        // match[2] will be the total replacement without padding
        // match[optMatch.indexFile + 2] will be the file segment
        // match[optMatch.indexOptions + 2] will be the options segment
        indexFile = optMatch.indexFile + 2;   // adjust for indent
        indexOpt = optMatch.indexParam + 2; // adjust for indent.
        indexOrigMatch = 2;
      } else {
        indexFile = optMatch.indexFile;
        indexOpt = optMatch.indexParam;
        indexOrigMatch = 0;
      }
      
      // regex capture group to capture indent
      const reGroup1 = `(^[ \\t]+)?`;
      let reGroup2: string = '';
      let reStr: string;
      if (allowIndent === true) {
        reGroup2 += '(';
      }
      reGroup2 += `${optMatch.prefix}${optMatch.name}${optMatch.fileName}${optMatch.parameters}${optMatch.suffix}`;

      if (allowIndent === true) {
        reGroup2 += ')';
        // also include indent at the start of the regex
        reStr = `${reGroup1}${reGroup2}`;
      } else {
        reStr = reGroup2;
      }
      let mOpt: string = optMatch.options;
      // multi line is required to check for start of line ^
      if (mOpt) {
        mOpt = mOpt.toLowerCase();
        if (mOpt.indexOf('m') === -1) {
          mOpt += 'm';
        }
      } else {
        mOpt = 'm';
      }
      if (this.verbose) {
        grunt.log.write('GRUNT-BUILD-INCLUDE: ');
        grunt.log.writeln(` Regex Match in: /${optMatch.prefix}${optMatch.name}${optMatch.fileName}${optMatch.parameters}${optMatch.suffix}/${optMatch.options}`);

        grunt.log.write('GRUNT-BUILD-INCLUDE: ');
        grunt.log.writeln(` Regex Full: /${reStr}/${mOpt}`);
      }

      const re = new RegExp(reStr, mOpt);
      let match: RegExpExecArray | null;

      match = re.exec(contents);

      while (match !== null) {
        const biOpt: IBuildIncludeOpt = getBiOptionsDefault();
        let fileContent: string;
        grunt.log.write('.');
        grunt.log.verbose.writeln('    Match array: ' + match);

        const filePath: string = this.processFilePath(match[indexFile], optMatch);
        if (filePath.length === 0) {
          grunt.log.error(`GRUNT-BUILD-INCLUDE: No valid file name for replacement: '${match[indexOrigMatch]}' in: '${srcpath}'`);
          // replace the bad match so we do not end up in a endless recursive loop
          // replace form start of line to end of match.
          contents = contents.replace(match[0], '');
          match = re.exec(contents);
          continue;
        }

        if (this.verbose) {
          grunt.log.verbose.write('GRUNT-BUILD-INCLUDE: ');
          grunt.log.verbose.writeln(`File to embed: '${filePath}'`);
        }
        fileContent = grunt.file.read(filePath);
        // once the file contents are read the first thing to do is process any build_inclue
        // statements in the fileContent.
        // This will not match other types of matches different than the original match
        // If this match based upon regexKind.buildIncludeSlash then recursivly only the same
        // pattern would match.
        // recursion may be the best way to do this.
        let innerMatch: RegExpExecArray | null;
        innerMatch = re.exec(fileContent);
        if (innerMatch !== null) {
          if (this.verbose) {
            grunt.log.verbose.write('GRUNT-BUILD-INCLUDE: ');
            grunt.log.verbose.writeln(`Recursivly processing file '${filePath}'`);
          }
          const inProcess: BuildProcess = new BuildProcess();
          // replace the fileContent with the new content from the recursion.
          fileContent = inProcess.buildInclude(fileContent, filePath);
        }
        // If options were set, then parse them
        let hasOptions: boolean = false;
        // process all options
        if (match[indexOpt]) {
          hasOptions = this.processOptions(indexIndent, indexOpt, match, biOpt);
        } // if (match[indexOpt])

        // check to see if any options were set at the grunt file level.
        // and merge them if exist.
        hasOptions = biMergeOptions(biOpt, options) || hasOptions;

        if (allowIndent === false) {
          // if allow indent is false this will be an exception to 
          // what may be set with text options for indent.
          // in this case grunt file will win if match prefix contains ^
          biOpt.text.indent = false;
        }
        // now that all the options have been parsed process based upon options
        // if no options are set then do a straight replace;
        if (hasOptions === false) {
          // with a straight replaec no need to consider indent
          contents = contents.replace(match[indexOrigMatch], fileContent);
          match = re.exec(contents);
          continue;
        }
        if (hasOptions === true) {
          // read setting from hightest to lowest prority
          // if string break is not set then remove all the newline
          if (biOpt.text.noLineBreaks === true) {
            fileContent = this.removeLnB(fileContent);
          }
          if (biOpt.asJsString === true) {
            fileContent = codeString(fileContent, eKind.jsString, eProcess.encode);
          }
          if (biOpt.text.isCode) {
            // if the encoding is set as an option on the text
            // then encode or decode the replacement file contents as requested
            fileContent = this.stringDecodeEncode(fileContent, biOpt.text.code, biOpt.text.codeKind);
            // before and after text will be applied later
          }
        } // if (match[indexOpt]) process all options

        if (allowIndent === true
          && biOpt.text.isSet === true
          && biOpt.text.indent === true) {
          biOpt.indent = match[1];
        }

        // do not replace indent
        let replaceIndex: number = indexOrigMatch;
        if (allowIndent === false
          || (biOpt.text.isSet && biOpt.text.indent === true)) {
          // replace indent as well.
          replaceIndex = 0;
        }
        const matchArr: Array<IMatchType> = this.getMatchArray(fileContent, biOpt);
        fileContent = this.processMatch(biOpt, matchArr);
        if (biOpt.text.isSet === true) {
          if (biOpt.text.before.length > 0) {
            fileContent = biOpt.text.before + fileContent;
          }
          if (biOpt.text.after.length > 0) {
            fileContent += biOpt.text.after;
          }
        }
        contents = contents.replace(match[replaceIndex], fileContent);
        match = re.exec(contents);
      } // while (match !== null)
      grunt.log.writeln('');
      return contents;
    } // if (contents.indexOf('BUILD_INCLUDE') > -1)
    return contents;
  }; // end: buildInclude()
  // #endregion
  // #region Process Methods
  //  #region processMatch
  /**
   * Processes a build_include ( or variation of ) match and applies any options.
   * @param biOpt The current options. This parameter is an object and
   * will be potentially modified by this method.
   * @param fileContent The contents of the current replacement file
   * @returns The filecontent with all build_include options applied
   */
  private processMatch(biOpt: IBuildIncludeOpt, matches: Array<IMatchType>): string {
    let strA: string[] = []
    // it is possible the matches contain a lot of empty
    // lines. This espically can happen if fencing is to remove
    // and there was a number of fences in a row.
    let mA: Array<IMatchType>;
    if (biOpt.text.isSet === true && biOpt.text.whiteSpaceLine > whiteSpLn.noAction) {
      mA = this.processWhiteSpLns(biOpt, matches);
    } else {
      mA = matches;
    }
    mA.forEach(mt => {
      if (mt.kind === matchKind.fence) {
        strA.push(mt.value);
      } else if (mt.kind === matchKind.normal) {
        let content: string = '';
        const segment: string = mt.value;


        // only break for comment if breakstring options are not set
        // otherwise allow the breakstring options to break the string.
        if (biOpt.comment.isSet === true && biOpt.bs.isSet === false) {
          // only split fileContent into array if not yet split
          if (biOpt.lines.length === 0) {
            biOpt.lines = stringBreaker(segment,
              {
                lnEnd: lnEndOpt.noLnBr,
                splitOpt: splitByOpt.line,
                lenOpt: biOpt.bs.flags
              });
          }
        }
        // break string is set. time to break fileContent into lines
        if (biOpt.bs.isSet === true) {
          // only split fileContent into array if not yet split
          if (biOpt.lines.length === 0) {
            // if encoding as javascript string then width will be width -1 to accomidate
            // enscaped line chars \
            biOpt.lines = stringBreaker(segment,
              {
                width: biOpt.asJsString ? biOpt.bs.width - 1 : biOpt.bs.width,
                lnEnd: biOpt.bs.lineEnd,
                splitOpt: biOpt.bs.break,
                lenOpt: biOpt.bs.flags
              });
          }
        } // if (biOpt.bs.isSet === true)

        if (biOpt.comment.isSet === true) {
          biOpt.lines = this.processComment(biOpt);
          content = this.buildBreakStringNormal(biOpt);
        } else if (biOpt.bs.isSet === true) {
          biOpt.lines = this.buildBreakString(biOpt);
          content = this.buildBreakStringNormal(biOpt);
        } else if (biOpt.lines.length > 0) {
          biOpt.lines = this.buildStringPreSuf(biOpt);
          content = this.buildBreakStringNormal(biOpt);
        } else {
          if (biOpt.text.noLineBreaks === true) {
            // if noLinBreaks is true then we have a single line
            if (biOpt.text.padding.padLeftAssigned === true) {
              content = this.padLeft(segment, biOpt.text.padding.padLeft);
            }
            if (biOpt.text.padding.padRigtAssigned === true) {
              content = this.padLeft(segment, biOpt.text.padding.padRight);
            }
          } else {
            // if biOpt.lines has not be set yet then no string breaking has taken place.
            // add the fileContent as a single
            // if (biOpt.lines.length === 0) {
            //   biOpt.lines = [fileContent];
            // }

            // at this point we may have a multi line fileContent
            // lets break by line and process simpple
            biOpt.lines = stringBreaker(segment, {
              splitOpt: splitByOpt.line,
              lenOpt: biOpt.bs.flags
            });
            biOpt.lines = this.buildStringPreSuf(biOpt);
            content = this.buildBreakStringNormal(biOpt);
          }
        }
        strA.push(content);
        biOpt.lines = [];
      }
    });

    biOpt.lines = [];
    if (biOpt.comment.isSet) {
      biOpt.lines = strA;
      this.processCommentFinal(biOpt);
      strA = biOpt.lines;
      biOpt.lines = [];
    }
    return strA.join(EOL);
  }
  //  #endregion
  //  #region processComment
  /**
   * Process any comments that are in the current biOpt.Lines and returns
   * an string array of processed lines.
   * @param biOpt The current options. This parameter is an object and
   * will be potentially modified by this method.
   * @returns a string[] of comment processed lines.
   * @see [[processCommentFinal]]
   */
  private processComment(biOpt: IBuildIncludeOpt): string[] {
    let result: string[] = [];
    if (biOpt.comment.isSet === true) {
      switch (biOpt.comment.type) {
        case commentKind.single:
        case commentKind.pound:
        case commentKind.singleAsterisk:
          result = this.commentSingle(biOpt);
          break;
        case commentKind.multi:
        case commentKind.jsdoc:
          result = this.commentMulti(biOpt);
          break;
        case commentKind.html:
          result = this.commentHtml(biOpt);
          break;
        case commentKind.jsAuto:
          result = this.commentJsAuto(biOpt);
          break;
        default:
          // if not a proper kind the return content
          result = biOpt.lines;
          break;
      }
    }
    return result;
  }
  //  #endregion
  /**
   * Depending on the type of comment this method will modify biOpt
   * to put comment marks at the start and end of biOpt.lines
   * @param biOpt The current options. This parameter is an object and
   * will be potentially modified by this method.
   * @see [[processComment]]
   */
  private processCommentFinal(biOpt: IBuildIncludeOpt): void {
    if (biOpt.comment.isSet === true) {
      switch (biOpt.comment.type) {
        case commentKind.multi:
        case commentKind.jsdoc:
          this.commentMultiFinal(biOpt);
          break;
        case commentKind.html:
          this.commentHtmlFinal(biOpt);
          break;
        case commentKind.jsAuto:
          this.commentJsAutoFinal(biOpt);
          break;
        default:
          break;
      }
    }
  }

  //  #region processOptions
  /**
   * Process options and assigns any found options into biOpt.
   * @param indexIndent The index of indent in the build_include match.
   * @param indexOpt The index of options in the build_include match.
   * @param match The current buld_includ ( or variation of ) match.
   * @param biOpt The current options. This parameter is an object and
   * will be potentially modified by this method.
   * @returns Returns `true` if any options were found: Otherwise, `false`.
   */
  private processOptions(indexIndent: number, indexOpt: number, match: RegExpExecArray, biOpt: IBuildIncludeOpt): boolean {
    const fileIncludeOptions: string[] = this.splitArgs(match[indexOpt]);
    let hasOptions: boolean = false;
    // test for asjsstring
    if (this.getOptionsAsJsString(fileIncludeOptions, biOpt)) {
      hasOptions = true;
    }
    if (this.getOptionsBreakString(fileIncludeOptions, biOpt) === true) {
      hasOptions = true;
    }
    // test fo text options
    if (this.getOptionsText(fileIncludeOptions, biOpt)) {
      hasOptions = true;
      if (biOpt.text.indent === true) {
        if (match[indexIndent]) {
          biOpt.indent = match[indexIndent];
        }
      }
    }
    // test for comment
    if (this.getOptionsComment(fileIncludeOptions, biOpt)) {
      hasOptions = true;
    }
    if (this.getOptionsFence(fileIncludeOptions, biOpt)) {
      hasOptions = true;
    }
    return hasOptions;
  }
  //  #endregion
  //  #region processFilePath
  /**
   * Process File Path of build_include
   * @param strFile The current matched file from build_replacement ( or variation of ).
   * @param optMatch Match options for matching build_include in files.
   */
  private processFilePath(strFile: string, optMatch: IMatchOpt): string {
    if (!strFile) {
      return '';
    }
    let filePath: string = strFile;
    // optMath.path will be '' or a parent path to append to the file
    filePath = optMatch.path + filePath;
    filePath = filePath.trim();
    if (filePath.length === 0) {
      return '';
    }
    filePath = this.unixifyPath(filePath);
    filePath = grunt.template.process(filePath, undefined);
    return filePath;
  }
  //  #endregion
  // #endregion
  // #region Get Options Methods
  //  #region getOptionsAsJsString
  /**
   * Check opts for asjsstring and assigns any found options to biOpt
   * @description
   * The only option to be set is <em>asjsstring</em>
   *
   * Sets option for [biOpt.asJsString]{@link IBuildIncludeOpt.asJsString}
   * 
   * **AsJsString** is basicly an alias for:
   *
   * >`text?code=jsString&kind=encode`
   * @param opts The array of options to search for break string options in
   * @param biOpt The current options. This parameter is an object and
   * will be potentially modified by this method.
   * @example
   * 
   * [[include:docs/BuildProcess/getOptionsAsJsStringEx.md]]
   */
  private getOptionsAsJsString(opts: string[], biOpt: IBuildIncludeOpt): boolean {
    const asjRx: RegExp = /\s*asjsstring\s*/i;
    if (
      opts.some(option => {
        /*
         * Test to seee if asjsstring is present in the options
         * If asjsstring is present the string will be encode as a javascript string.
         * Combined with break string will will result in a multi-line
         * string with line ending escapes \
         */
        if (asjRx.test(option)) {
          biOpt.asJsString = true;
          return true;
        }
        return false;
      })
    ) {
      return true;
    }
    return false;
  }
  //  #endregion
  //  #region getOptionsBreakString
  /**
   * Checks opts for breakstring options and assigns any found options to biOpt
   * @description
   * Potential options are as follows.
   *
   * Sets options for [biOpt.bs]{@link IBuildIncludeOpt.bs}
   * 
   * [[include:docs/BuildProcess/getOptionsBreakString.md]]
   *
   * @param opts The array of options to search for break string options in
   * @param biOpt The current options. This parameter is an object and
   * will be potentially modified by this method.
   * @returns true if opts has break string options; Otherwise, false.
   * @see [string-breaker]{@link https://amourspirit.github.io/node-string-breaker/index.html}
   * @example
```js

// BUILD_INCLUDE('../myfile.txt')[breakstring?width=100&eol=encode]
// BUILD_INCLUDE('../myjavascript.js')[breakstring?break=line]
```
   */
  private getOptionsBreakString(opts: string[], biOpt: IBuildIncludeOpt): boolean {
    const rxBreakString: RegExp = /\s*(breakstring(\?.*)?\s*)/i;
    if (
      opts.some(option => {
        if (rxBreakString.test(option)) {
          let cMatch: RegExpExecArray | null;
          cMatch = rxBreakString.exec(option);
          if (cMatch) {
            // it is irrelevant if any options are set.
            // string can be split by default options
            // haveing breakstring in options is enough
            // without any parameters.
            biOpt.bs.isSet = true;
          }
          if (cMatch && cMatch[2]) {
            const opt = this.splitAndArgs(cMatch[2]);
            opt.some(kv => {
              const eqArgs = this.splitEqArgs(kv);
              let v: string;
              // must be a length of 1 or two
              if (eqArgs.length === 0 || eqArgs.length > 2) {
                return false;
              }
              const key = eqArgs[0].toLowerCase();
              switch (key) {
                case 'width':
                  if (eqArgs.length === 2) {
                    v = eqArgs[1];
                    v = v.trim();
                    if (v.length > 0) {
                      const iBsWidth: number = parseInt(v, 10);
                      if (isNaN(iBsWidth) === false) {
                        biOpt.bs.width = Math.abs(iBsWidth);
                      }
                    }
                  }
                  break;
                case 'flags':
                  if (eqArgs.length === 2) {
                    v = eqArgs[1];
                    v = v.trim();
                    if (v.length > 0) {
                      v = v.toLowerCase();
                      if (v === 'word') {
                        biOpt.bs.flags = widthFlags.nearestWord;
                      }
                    }
                  }
                  break;
                case 'eol':
                  if (eqArgs.length === 2) {
                    biOpt.bs.lineEnd = Util.ParseEnumLnEndOpt(eqArgs[1]);
                  }
                  break;
                case 'break':
                  if (eqArgs.length === 2) {
                    biOpt.bs.break = Util.ParseEnumSplitByOpt(eqArgs[1]);
                  }
                  break;
                default:
                  break;
              }
              return false;
            });
          }
          return biOpt.bs.isSet;
        }
        return biOpt.bs.isSet;
      })
    ) {
      if (this.verbose) {
        grunt.log.verbose.write('GRUNT-BUILD-INCLUDE: Break String options set: ');
        grunt.log.verbose.writeln(this.keyValueToString(biOpt.bs));
      }
      return true;
    }
    return false;
  }
  //  #endregion
  //  #region getOptionsComment
  /**
   * Checks opts for comment options and assigns any found options to biOpt
   * @description
   * Potential options are as follows.
   *
   * Sets options for [biOpt.comment]{@link IBuildIncludeOpt.comment}
   *
   * [[include:docs/BuildProcess/getOptionsComment.md]]
   * 
   * @param opts The array of options to search for comment options in
   * @param biOpt The current options. This parameter is an object and
   * will be potentially modified by this method.
   * @returns true if opts has comment options; Otherwise, false.
   */
  private getOptionsComment(opts: string[], biOpt: IBuildIncludeOpt): boolean {
    const rxComment: RegExp = /\s*(comment(\?.*)?\s*)/i;
    if (
      opts.some(option => {
        if (rxComment.test(option)) {
          let cMatch: RegExpExecArray | null;
          cMatch = rxComment.exec(option);
          if (cMatch) {
            // it is irrelevant if any options are set.
            // comments can be applied with default options
            biOpt.comment.isSet = true;
          }
          if (cMatch && cMatch[2]) {
            // get array of strings in format of name=value or name
            const opt = this.splitAndArgs(cMatch[2]);
            opt.some(kv => {
              const eqArgs = this.splitEqArgs(kv);
              // must be a length of 1 or two
              if (eqArgs.length === 0 || eqArgs.length > 2) {
                return false;
              }
              const key = eqArgs[0].toLowerCase();
              switch (key) {
                case 'type':
                  if (eqArgs.length === 2) {
                    biOpt.comment.type = commentKind.parse(eqArgs[1]);
                  }
                  break;
                case 'padleft':
                  if (eqArgs.length === 2) {
                    if (this.isValidPadding(eqArgs[1])) {
                      biOpt.comment.padLeftAssigned = true;
                      biOpt.comment.padLeft = this.decodeParam(eqArgs[1]);
                    }
                    biOpt.comment.padLeft = this.decodeParam(eqArgs[1]);
                  }
                  break;
                default:
                  break;
              }
              return false;
            });
          }
          return biOpt.comment.isSet;
        }
        return biOpt.comment.isSet;
      })
    ) {
      if (this.verbose) {
        grunt.log.verbose.write('GRUNT-BUILD-INCLUDE: Comment options set: ');
        grunt.log.verbose.writeln(this.keyValueToString(biOpt.comment));
      }
      return true;
    }
    return false;
  }
  //  #endregion
  //  #region getOptionsFence
  /**
   * Get fence options
   * @param opts The array of options to search for fence options in
   * @param biOpt The current options. This parameter is an object and
   * will be potentially modified by this method.
   * @returns true if opts has fence options; Otherwise, false.
   */
  private getOptionsFence(opts: string[], biOpt: IBuildIncludeOpt): boolean {
    const rxFence: RegExp = /\s*(fence(\?.*)?\s*)/i;
    if (
      opts.some(option => {
        if (rxFence.test(option)) {
          let cMatch: RegExpExecArray | null;
          cMatch = rxFence.exec(option);
          let hasOption: boolean = false;
          if (cMatch) {
            // it is irrelevant if any options are set.
            hasOption = true;
          }
          if (cMatch && cMatch[2]) {
            // get array of strings in format of name=value or name
            const opt = this.splitAndArgs(cMatch[2]);
            opt.some(kv => {
              const eqArgs = this.splitEqArgs(kv);
              // must be a length of 1 or two
              if (eqArgs.length === 0 || eqArgs.length > 2) {
                return false;
              }
              const key = eqArgs[0].toLowerCase();
              switch (key) {
                case 'type':
                  if (eqArgs.length === 2) {
                    biOpt.fence.type = fenceKind.parse(eqArgs[1]);
                  }
                  break;
                case 'start':
                  biOpt.fence.start = eqArgs[1];
                  break;
                case 'end':
                  biOpt.fence.end = eqArgs[1];
                  break;
                case 'remove':
                  if (eqArgs.length === 1) {
                    // covers remove in query string without = value
                    biOpt.fence.remove = true;
                  } else if (eqArgs.length === 2) {
                    let v: string = eqArgs[1];
                    if (v.length === 0) {
                      // allow remove=
                      biOpt.fence.remove = true;
                    }
                    v = v.trim().toLowerCase();
                    if (v === '1' || v === 'true') {
                      biOpt.fence.remove = true;
                    }

                  }
                  break;
                default:
                  break;
              }
              return false;
            });
          }
          return hasOption;
        }
        return false;
      })
    ) {
      if (this.verbose) {
        grunt.log.verbose.write('GRUNT-BUILD-INCLUDE: Fence options set: ');
        grunt.log.verbose.writeln(this.keyValueToString(biOpt.fence));
      }
      // process the end and start to build biOpt.regex
      if (biOpt.fence.type === fenceKind.none) {
        if (biOpt.fence.start.length === 0
          || biOpt.fence.end.length === 0) {
          // Defalut to strict if start or end is not valid
          biOpt.fence.type = fenceKind.strict;
        }
      }
      const currentFence: IGruntOptFence | undefined = getFenceKind(biOpt.fence.type);
      if (currentFence) {
        const fenceOpt: RegExp | undefined = getFenceOptions(currentFence);
        if (fenceOpt) {
          biOpt.regexFence = fenceOpt;
        }
      }
      if (!biOpt.regexFence && biOpt.fence.type === fenceKind.none) {
        biOpt.regexFence = this.buildFenceRegex(biOpt.fence);
      }
      if (!biOpt.regexFence && biOpt.fence.type === fenceKind.multiFlex) {
        biOpt.regexFence = this.buildFenceMultiRegex();
      }
      if (biOpt.regexFence) {
        return true;
      }
      return false;
    }
    return false;
  }
  //  #endregion
  //  #region getOptionsText
  /**
   * Checks opts for text options and assigns any found options to biOpt
   * @description
   * Potential options are as follows.
   *
   * Sets options for [biOpt.text]{@link IBuildIncludeOpt.text}
   *
   * [[include:docs/BuildProcess/getOptionsText.md]]
   * 
   * @param opts The array of options to search for Text options in
   * @param biOpt The current options. This parameter is an object and
   * will be potentially modified by this method.
   * @returns true if opts has text options; Otherwise, false.
   * @example
```js

// BUILD_INCLUDE('../myjavascript.js')[text?padleft=10&before=// injected from file\n&code=jsString]
```
   */
  private getOptionsText(opts: string[], biOpt: IBuildIncludeOpt): boolean {
    const rxText: RegExp = /\s*(text(\?.*)\s*)/i;
    if (
      opts.some(option => {
        if (rxText.test(option)) {
          const cMatch = rxText.exec(option);
          // it is relevant if any options are set.
          // text cannot run with some options being set
          let hasOption: boolean = false;
          if (cMatch && cMatch[2]) {
            // get array of strings in format of name=value or name
            const opt = this.splitAndArgs(cMatch[2]);
            opt.some(kv => {
              const eqArgs = this.splitEqArgs(kv);
              // must be a length of 1 or two
              if (eqArgs.length === 0 || eqArgs.length > 2) {
                return false;
              }
              const key = eqArgs[0].toLowerCase();
              let v: string;
              switch (key) {
                case 'padleft':
                  if (eqArgs.length === 2) {
                    if (this.isValidPadding(eqArgs[1])) {
                      hasOption = true;
                      biOpt.text.padding.padLeftAssigned = true;
                      biOpt.text.padding.padLeft = this.decodeParam(eqArgs[1]);
                    }
                  }
                  break;
                case 'padright':
                  if (eqArgs.length === 2) {
                    if (this.isValidPadding(eqArgs[1])) {
                      hasOption = true;
                      biOpt.text.padding.padRigtAssigned = true;
                      biOpt.text.padding.padRight = this.decodeParam(eqArgs[1]);
                    }
                  }
                  break;
                case 'kind':
                  if (eqArgs.length === 2) {
                    v = eqArgs[1];
                    v = v.trim();
                    if (v.length > 0) {
                      hasOption = true;
                      biOpt.text.codeKind = eProcess.parse(v);
                    }
                  }
                  break;
                case 'code':
                  if (eqArgs.length === 2) {
                    v = eqArgs[1];
                    v = v.trim();
                    if (v.length > 0) {
                      hasOption = true;
                      biOpt.text.code = eKind.parse(v);
                    }
                  }
                  break;
                case 'before':
                  if (eqArgs.length === 2) {
                    hasOption = true;
                    biOpt.text.before = this.decodeParam(eqArgs[1]);
                  }
                  break;
                case 'after':
                  if (eqArgs.length === 2) {
                    hasOption = true;
                    biOpt.text.after = this.decodeParam(eqArgs[1]);
                  }
                  break;
                case 'nolinebreaks':
                  // accept nolinebreaks or nolinebreaks=true
                  if (eqArgs.length === 2) {
                    v = eqArgs[1];
                    v = v.trim();
                    if (v.length > 0) {
                      hasOption = true;
                      v = v.toLocaleLowerCase();
                      if (v === 'true' || v === '1') {
                        biOpt.text.noLineBreaks = true;
                      }
                    }
                  } else if (eqArgs.length === 1) {
                    hasOption = true;
                    biOpt.text.noLineBreaks = true;
                  }
                  break;
                case 'indent':
                  // accept indent or indent=true
                  if (eqArgs.length === 2) {
                    v = eqArgs[1];
                    v = v.trim();
                    if (v.length > 0) {
                      hasOption = true;
                      v = v.toLocaleLowerCase();
                      if (v === 'true' || v === '1') {
                        biOpt.text.indent = true;
                      }
                    }
                  } else if (eqArgs.length === 1) {
                    hasOption = true;
                    biOpt.text.indent = true;
                  }
                  break;
                case 'whitespaceline':
                  if (eqArgs.length === 2) {
                    v = eqArgs[1];
                    v = v.trim();
                    if (v.length > 0) {
                      hasOption = true;
                      biOpt.text.whiteSpaceLine = whiteSpLn.parse(v);
                    }
                  }
                  break;
                default:
                  break;
              }
              return false;
            });

            biOpt.text.isSet = hasOption;
            return hasOption;
          }
        }
        return false;
      })
    ) {
      // if code or kind is set both should be set
      if (biOpt.text.code > eKind.none || biOpt.text.codeKind > eProcess.none) {
        if (biOpt.text.codeKind === eProcess.none) {
          grunt.log.warn(`GRUNT-BUILD-INCLUDE: when code is set the kind option of text must be set to a valid value: "${opts.join()}"`);
          // if kind is invalid the reset code
          biOpt.text.code = eKind.none;
        } else if (biOpt.text.code === eKind.none) {
          grunt.log.warn(`GRUNT-BUILD-INCLUDE: when kind is set the code option of text must be set to a valid value: "${opts.join()}"`);
          // if code is invalid the reset kind
          biOpt.text.codeKind = eProcess.none;
        }
        if (this.verbose) {
          grunt.log.verbose.write('GRUNT-BUILD-INCLUDE: Text options set: ');
          grunt.log.verbose.writeln(this.keyValueToString(biOpt.text));
        }
      }
      if (biOpt.text.code > eKind.none && biOpt.text.codeKind > eProcess.none) {
        biOpt.text.isCode = true;
      }
      return true;
    }
    return false;
  }
  //  #endregion
  // #endregion  
  // #region Build String methods
  //  #region buildBreakString
  /**
   * Breaks a string into lines by Javascript or regular breaks
   * @param biOpt The arguments from the options string values
   * The type of string nreaking will be terminde by args.asJsString
   */
  private buildBreakString(biOpt: IBuildIncludeOpt): string[] {
    if (biOpt.asJsString) {
      return this.buildBreakStringJs(biOpt);
    } else {
      return this.buildStringPreSuf(biOpt);
    }
  };
  // #endregion
  //  #region buildBreakStringJs
  /**
   * Builds a muli-line javascript string that has no padding before each line start.  
   * Padding can be applied after each line start and after each line.
   * @param biOpt TThe current options. This parameter is an object and
   * will be potentially modified by this method.
   *
   * The returning string will have line ending escaped using \
   * The lines are built from hte  args.lines value
   */
  private buildBreakStringJs(biOpt: IBuildIncludeOpt): string[] {
    const strA: string[] = [];
    if (biOpt.lines.length === 0) {
      return strA;
    }
    let newStr: string = '';
    const strPrefix: string = this.getPadding(biOpt.text.padding.padLeft);
    const strSuffix: string = this.getPadding(biOpt.text.padding.padRight);
    const splitEol = biOpt.bs.lineEnd === lnEndOpt.none;
    let isIndent: boolean = false;
    let indent: string = '';
    strA.push('\\');
    if (biOpt.text.indent === true && biOpt.indent && biOpt.indent.length > 0) {
      isIndent = true;
      indent = biOpt.indent;
    }
    if (splitEol === true) {
      for (const line of biOpt.lines) {
        // break line into string array based upon line and add each line seperatly
        const sTmp: string[] = stringBreaker(line, { splitOpt: splitByOpt.line });
        for (const inLine of sTmp) {
          newStr = strPrefix + inLine + strSuffix + '\\';
          if (isIndent === true) {
            newStr = indent + newStr;
          }
          strA.push(newStr);
        }
      }
    } else {
      for (const line of biOpt.lines) {
        newStr = strPrefix + line + strSuffix + '\\';
        if (isIndent === true) {
          newStr = indent + newStr
        }
        strA.push(newStr);
      }
    } // if (splitEol === true)
    if (strA.length > 0) {
      let lastLn: string | undefined = strA.pop();
      if (lastLn !== undefined) {
        if ((lastLn.length - 1) < biOpt.bs.width) {
          // remove last escape \
          lastLn = lastLn.substring(0, lastLn.length - 1);
          lastLn += ';';
          strA.push(lastLn);
        } else {
          strA.push(lastLn);
          strA.push(';');
        }
      } else {
        // in theory this should never happen
        // but typscript forces .pop() to possibley be undefined
        strA.push(';');
      }
    }
    return strA;
  };
  // #endregion
  //  #region buildStringPreSuf
  /**
   * Builds a string into a multi-line string with each line seperated by \n
   * @param biOpt The current options. This parameter is an object and
   * will be potentially modified by this method.
   *
   * If args.text.padLeft is set it will be applied at the start of each line.
   * 
   * If args.text.padRight is set it will be applied at the end of each line.
   *
   * The lines are built from the  args.lines value.
   */
  private buildStringPreSuf(biOpt: IBuildIncludeOpt): string[] {
    const strA: string[] = [];
    const strPrefix: string = this.getPadding(biOpt.text.padding.padLeft);
    const strSuffix: string = this.getPadding(biOpt.text.padding.padRight);
    const splitEol = biOpt.bs.lineEnd === lnEndOpt.none;
    let newStr: string = '';
    let isIndent: boolean = false;
    let indent: string = '';
    if (biOpt.text.indent === true && biOpt.indent && biOpt.indent.length > 0) {
      isIndent = true;
      indent = biOpt.indent;
    }
    if (splitEol === true) {
      for (const line of biOpt.lines) {
        // break line into string array based upon line and add each line seperatly
        const sTmp: string[] = stringBreaker(line, { splitOpt: splitByOpt.line });
        for (const inLine of sTmp) {
          newStr = strPrefix + inLine + strSuffix;
          if (isIndent === true) {
            newStr = indent + newStr;
          }
          strA.push(newStr);
        }
      }
    } else {
      for (const line of biOpt.lines) {
        newStr = strPrefix + line + strSuffix;
        if (isIndent === true) {
          newStr = indent + newStr;
        }
        strA.push(newStr);
      }
    } // if (splitEol === true)
    return strA;
  };
  // #endregion
  //  #region buildBreakStringNormal
  /**
   * Builds a string into a multi-line string with each line seperated by \n
   * @param biOpt The arguments from the options string values
   *
   * The lines are built from the  args.lines value.
   *
   * No padding is applied in this process
   */
  private buildBreakStringNormal(biOpt: IBuildIncludeOpt): string {
    return biOpt.lines.join(EOL);
  };
  // #endregion
  //  #region buildFenceRegex
  /**
   * Converts a fence into a Regular expression
   * @param fence Instance of fence to convert to regex
   */
  private buildFenceRegex(fence: IFence): RegExp {
    let regStart: RegExp;
    let regEnd: RegExp;
    let x: string;
    if (this.isRegexStr(fence.start) === true) {
      x = fence.start.substr(1, fence.start.length - 1);
      regStart = new RegExp(x);
    } else {
      regStart = new RegExp(DEFAULT_FENCE_START.replace('{0}', Util.EscapeRegex(fence.start)));
    }
    if (this.isRegexStr(fence.end) === true) {
      x = fence.end.substr(1, fence.end.length - 1);
      regEnd = new RegExp(x);
    } else {
      regEnd = new RegExp(DEFAULT_FENCE_END.replace('{0}', Util.EscapeRegex(fence.end)));
    }
    const result = new RegExp(`(${regStart.source}${regEnd.source})`, 'm');
    return result;
  }
  // #endregion
  /**
   * Combines [[strictFence]], [[tildeFence]] and [[escapeFence]] into one regular expression.
   */
  private buildFenceMultiRegex(): RegExp | undefined {
    const fStrict = getFenceOptions(new StrictFence());
    const fTilde = getFenceOptions(new TildeFence());
    const fEscape = getFenceOptions(new EscapeFence());
    if (fStrict && fTilde && fEscape) {
      // It seems to me that order matters here.
      // first check for escape then tilde and lastly strict.
      // want to avoid selecting strict inside of escape or tilde.
      // https://markdownmonster.west-wind.com/docs/_5eg1brc0z.htm
      const re = new RegExp(`${fEscape.source}|${fTilde.source}|${fStrict.source}`, 'm');
      return re;
    }
    return undefined;
  }
  // #endregion
  // #region Comment Methods
  //  #region commentJsAuto
  /**
   * Determins if the lines passed in var biOpt are formated
   * as multi-line coments or single-line comments
   * @param biOpt The current options. This parameter is an object and
   * will be potentially modified by this method.
   * @see [[commentJsAutoFinal]]
   */
  private commentJsAuto(biOpt: IBuildIncludeOpt): string[] {
    // if encoded using breakstring?eol=none
    // then elements may contain line breaks and should be split for such a case
    const splitEol = biOpt.bs.lineEnd === lnEndOpt.none;
    let multi: boolean = biOpt.lines.length > 1;
    if (splitEol === true && multi === false) {
      for (const line of biOpt.lines) {
        // break line into string array based upon line and test each line seperatly
        const sTmp: string[] = stringBreaker(line, { splitOpt: splitByOpt.line });
        if (sTmp.length > 1) {
          multi = true;
          break;
        }
      }
    }
    // biOpt.opt.jsAutoType was introduced when fencing was introdued
    // it allows final comment processing to know if the comment is
    // a multi-line type of commnet or not
    // biOpt.opt.jsAutoType is read in commentJsAutoFinal
    if (multi === true) {
      biOpt.opt.jsAutoType = 'm';
      return this.commentMulti(biOpt);
    }
    biOpt.opt.jsAutoType = 's';
    return this.commentSingle(biOpt);
  }
  //  #endregion
  /**
   * Appends multi comment marks before and after the biOpt.lines if needed.
   * @param biOpt The current options. This parameter is an object and
   * will be potentially modified by this method.
   * @see [[commentJsAuto]]
   */
  private commentJsAutoFinal(biOpt: IBuildIncludeOpt): void {
    let multi: boolean = false;
    // see commentJsAuto
    if (biOpt.opt.hasOwnProperty('jsAutoType') === true && biOpt.opt.jsAutoType === 'm') {
      multi = true;
    }
    if (multi === true) {
      this.commentMultiFinal(biOpt);
    }
  }
  //  #region commentHtml
  /**
   * Generates an array with the body of content for a html comment.  
   * applies Padding as follows:
   * [[IComment.padLeft]] is applied to the beginning of each line
   *  
   * [[IPadding.padLeft]] is applied before comment
   * 
   * [[IPadding.padRight]] is applied after comment
   * 
   * Indent is appled to the start if each line if indenting is enabled.
   * @param biOpt The current options. This parameter is an object and
   * will be potentially modified by this method.
   * @see [[commentHtmlFinal]]
   */
  private commentHtml(biOpt: IBuildIncludeOpt): string[] {
    if (biOpt.lines.length === 0) {
      return [];
    }
    // if encoded using breakstring?eol=none
    // then elements may contain line breaks and should be split for such a case
    const splitEol = biOpt.bs.lineEnd === lnEndOpt.none;
    const strPad: string = this.getPadding(biOpt.comment.padLeft);
    let newStr: string;
    const strPrefix: string = this.getPadding(biOpt.text.padding.padLeft);
    const strSuffix: string = this.getPadding(biOpt.text.padding.padRight);
    const strA: string[] = [];
    let isIndent: boolean = false;
    let indent: string = '';
    if (biOpt.text.indent === true && biOpt.indent && biOpt.indent.length > 0) {
      isIndent = true;
      indent = biOpt.indent;
    }
    if (splitEol === true) {
      for (const line of biOpt.lines) {
        // break line into string array based upon line and add each line seperatly
        const sTmp: string[] = stringBreaker(line, { splitOpt: splitByOpt.line });
        for (const inLine of sTmp) {
          newStr = strPad + strPrefix + inLine + strSuffix;
          if (isIndent === true) {
            newStr = indent + newStr;
          }
          strA.push(newStr);
        }
      }
    } else {
      for (const line of biOpt.lines) {
        newStr = strPad + strPrefix + line + strSuffix;
        if (isIndent === true) {
          newStr = indent + newStr;
        }
        strA.push(newStr);
      }
    } // if (splitEol === true)
    // biOpt.opt.htmlMulti was introduced when fencing was introdued
    // it allows final comment processing to know if the comment is
    // a single line html comment or multil line
    // biOpt.opt.htmlMulti is read in commentHtmlFinal
    if (strA.length === 1) {
      biOpt.opt.htmlMulti = 'y';
    } else {
      biOpt.opt.htmlMulti = 'n';
    }
    return strA;
  };
  //  #endregion
  //  #region commentMulti
  /**
   * Builds a string array of lines with multiline comments
   * for the body of a multiline style or JsDoc style.
   * 
   * [[IComment.padLeft]] is applied to the beginning of each line
   *
   * [[IPadding.padLeft]] is applied before comment
   *
   * [[IPadding.padRight]] is applied after comment
   *
   * Each line in the array is prefixed with `*` and depending on the paddind space(s) on each side.
   * Indent is appled to the start if each line if indenting is enabled.
   * @param biOpt The current options.
   * This parameter is an object and will be potentially modified by this method.
   * @see [[commentMultiFinal]]
   */
  private commentMulti(biOpt: IBuildIncludeOpt): string[] {
    if (biOpt.lines.length === 0) {
      return [];
    }
    // if encoded using breakstring?eol=none
    // then elements may contain line breaks and should be split for such a case
    const splitEol = biOpt.bs.lineEnd === lnEndOpt.none;
    const strPad: string = this.getPadding(biOpt.comment.padLeft);
    let newStr: string = '';
    const strPrefix: string = this.getPadding(biOpt.text.padding.padLeft);
    const strSuffix: string = this.getPadding(biOpt.text.padding.padRight);
    let isIndent: boolean = false;
    let indent: string = '';
    if (biOpt.text.indent === true && biOpt.indent && biOpt.indent.length > 0) {
      isIndent = true;
      indent = biOpt.indent;
    }
    const strA: string[] = [];
    let cmtSep: string = ' *';

    if (biOpt.text.padding.padLeftAssigned === false) {
      // text padding is excluded then add a single space
      cmtSep += ' ';
    }
    if (splitEol === true) {
      for (const line of biOpt.lines) {
        // break line into string array based upon line and add each line seperatly
        const sTmp: string[] = stringBreaker(line, { splitOpt: splitByOpt.line });
        for (const inLine of sTmp) {
          newStr = strPad + cmtSep + strPrefix + inLine + strSuffix;
          if (isIndent === true) {
            newStr = indent + newStr;
          }
          strA.push(newStr);
        }
      }
    } else {
      for (const line of biOpt.lines) {
        newStr = strPad + cmtSep + strPrefix + line + strSuffix;
        if (isIndent === true) {
          newStr = indent + newStr;
        }
        strA.push(newStr);
      }
    } // if (splitEol === true)
    return strA;
  };
  //  #endregion
  //  #region commentMultiFinal
  /**
   * Appends multi comment marks before and after the biOpt.lines
   * @param biOpt The current options.
   * This parameter is an object and will be potentially modified by this method.
   * @see [[commentMulti]]
   */
  private commentMultiFinal(biOpt: IBuildIncludeOpt): void {
    let isIndent: boolean = false;
    let indent: string = '';
    const strPad: string = this.getPadding(biOpt.comment.padLeft);
    let newStr: string = strPad + '/*';
    if (biOpt.text.indent === true && biOpt.indent && biOpt.indent.length > 0) {
      isIndent = true;
      indent = biOpt.indent;
      newStr = indent + newStr;
    }
    if (biOpt.comment.type === commentKind.jsdoc) {
      // jsDoc
      newStr += '*';
    }
    biOpt.lines.unshift(newStr);
    if (isIndent === true) {
      newStr = indent + strPad + ' */';
    } else {
      newStr = strPad + ' */';
    }
    biOpt.lines.push(newStr);
  }
  //  #endregion
  //  #region commentHtmlFinal
  /**
   * Wraps the results of [[commentHtml]] in html comments marks.
   * 
   * If there is a single line of comments then that line will have a prefix of
   * `<!-- ` and a suffix of ` -->`.
   * 
   * If there are multiple lines then `<--` will be the the first line and
   * `-->` will be the last line.
   * @param biOpt The current options. This parameter is an object and
   * will be potentially modified by this method.
   * @see [[commentHtml]]
   */
  private commentHtmlFinal(biOpt: IBuildIncludeOpt): void {
    if (biOpt.lines.length === 0) {
      return
    }
    const prefix: string = '<!--';
    const suffix: string = '-->';
    // see commentHtml to see where biOpt.opt.htmlMulti is set.
    if (biOpt.opt.hasOwnProperty('htmlMulti') === true && biOpt.opt.htmlMulti === 'y') {
      biOpt.lines[0] = prefix + ' ' + biOpt.lines[0] + ' ' + suffix;
    } else {
      biOpt.lines.unshift(prefix);
      biOpt.lines.push(suffix);
    }
  }
  //  #endregion
  //  #region commentSingle
  /**
   * Builds a string array of lines with single line comments
   * @param biOpt The arguments from the options string values.
   *
   * If args.comment.padLeft is set it will be applied before * for each line of the comment.
   *
   * If args.text.padLeft is set it will be applied after * but before each line of the comment.
   *
   * If args.text.padRight is set it will be applied after each line of the comment.
   */
  private commentSingle(biOpt: IBuildIncludeOpt): string[] {
    if (biOpt.lines.length === 0) {
      return [];
    }
    // if encoded using breakstring?eol=none
    // then elements may contain line breaks and should be split for such a case
    const splitEol = biOpt.bs.lineEnd === lnEndOpt.none;
    const strPad: string = this.getPadding(biOpt.comment.padLeft);

    const strPrefix: string = this.getPadding(biOpt.text.padding.padLeft);
    const strSuffix: string = this.getPadding(biOpt.text.padding.padRight);
    let isIndent: boolean = false;
    let indent: string = '';
    if (biOpt.text.indent === true && biOpt.indent && biOpt.indent.length > 0) {
      isIndent = true;
      indent = biOpt.indent;
    }
    let cmtSep: string;
    switch (biOpt.comment.type) {
      case commentKind.pound:
        cmtSep = '#';
        break;
      case commentKind.singleAsterisk:
        cmtSep = '*';
        break;
      default:
        cmtSep = '//';
        break;
    }
    if (biOpt.text.padding.padLeftAssigned === false) {
      // text padding is excluded then add a single space
      cmtSep += ' ';
    }
    const strA: string[] = [];
    let newStr: string;
    if (splitEol === true) {
      for (const line of biOpt.lines) {
        // break line into string array based upon line and add each line seperatly
        const sTmp: string[] = stringBreaker(line, { splitOpt: splitByOpt.line });
        for (const inLine of sTmp) {
          newStr = strPad + cmtSep + strPrefix + inLine + strSuffix;
          if (isIndent === true) {
            newStr = indent + newStr;
          }
          strA.push(newStr);
        }
      }
    } else {
      for (const line of biOpt.lines) {
        newStr = strPad + cmtSep + strPrefix + line + strSuffix;
        if (isIndent === true) {
          newStr = indent + newStr;
        }
        strA.push(newStr);
      }
    } // if (splitEol === true)
    return strA;
  };
  //  #endregion
  // #endregion
  // #region padding methods
  //  #region padLeft
  /**
   * Pads the left side of a string.
   * @param value A string to pad left.
   * @param padding The padding to apply
   * If padding is a string it will be used.
   * If padding is a number that number will be converted to spaces equal to the number
   */
  private padLeft(value: string, padding: string | number): string {
    const strPad = this.getPadding(padding);
    return strPad + value;
  };
  // #endregion
  //  #region getPadding
  /**
   * Get a string that represents padding to apply to another string.
   * @param padding A string or Number to convert to padding string.
   * If padding is a string then it will be URI Decoded and returned.
   *
   * If pading was 'https%3A%2F%2Fsomeurl.com%2Fmy%20test.asp%3Fname%3Dst'
   * it would be returned as 'https://someurl.com/my test.asp?name=ståle&car=saab'
   */
  private getPadding(padding: string | number): string {
    const num: number = parseInt(padding.toString(), 10);
    let v: string | number;
    if (isNaN(num) === true) {
      v = padding;
    } else {
      v = num;
    }
    if (typeof v === 'number') {
      v = Math.abs(v);
      return Array(v + 1).join(' ');
    }
    if (typeof v === 'string') {
      if (v.length === 0) {
        return '';
      }
      // return decodeURIComponent(v);
      return v;
    }
    throw new Error(`Expected string or number, got '${padding}'.`);
  };
  //  #endregion
  //  #region isValidPadding
  /**
   * Get if  a string or number that represents padding is valid padding value
   * Empty string and 0 are considered to be valid padding values as well.
   * @param padding A string or Number to test for padding values
   * @returns true if padding is valid; Otherwise, false
   */
  private isValidPadding(padding: string | number): boolean {
    const num: number = parseInt(padding.toString(), 10);
    let v: string | number;
    if (isNaN(num) === true) {
      v = padding;
    } else {
      v = num;
    }
    if (typeof v === 'number') {
      return true;
    }
    if (typeof v === 'string') {
      return true;
    }
    return false;
  };
  //  #endregion
  // #endregion
  // #region Encode/Decode methods
  //  #region stringDecodeEncode
  /**
   * Encodes or Decodes a string
   * @param s The string to encode or decode
   * @param e The kind of encodeing or decodeing,
   * such as base64, base64uri, jsString, uri
   * @param p Determins if the s is to be encoded or decoded
   */
  private stringDecodeEncode(s: string, e: eKindType, p: eProcessType): string {
    if (p === eProcess.decode) {
      return this.stringDecode(s, e);
    }
    if (p === eProcess.encode) {
      return this.stringEncode(s, e);
    }
    return s;
  };
  //  #endregion
  //  #region decodeParam
  /**
   * Decodes string such as \u2014 to —
   * @description
   * Parameters are read from files with a BUILD_INCLDDE comment.
   * Since the content is read from a file any inline javascript escapes
   * are not automatically converted. This method does such conversions.
   * Unescaps any &#92;&#92; to &#92; escaped colons.
   * <div>&nbsp;</div>
   * For Example:
   * 
```js
// BUILD_INCLDDE(./somfile.txt)[text?before=\n&padleft=# \u2014]
```
   *
   * This method decodes the unicode, line breaks and other JavaScript encodings.
   * This converts \n into an acutal new line and \u2014 into an em dash.
   * @param str string to decode
   */
  private decodeParam(str: string): string {
    if (str.length === 0) {
      return '';
    }
    // parameter are going to pretty much always be read from text files.
    // sometime user may want to write unincode in the form of \uxxxxx or \u{xxxxxx} inline
    // JSON.parse does not seem to handle the unicode formats - espically \u{xxxxxx} format.
    // the simple solution is to replace the unicode values before JSON.parse
    //
    // replace all \u{xxxx} values with actual uincode values
    // @ts-ignore comment suppresses all errors that originate on the following line.
    str = str.replace(/(\\u{([0-9A-Fa-f]{1,6})})/gm, (match: string, p1: string, p2: string): string => {
      // p1 is entire unicode string
      // p2 is hex value
      const num: number = parseInt(p2, 16);
      const p = String.fromCodePoint(num);
      return p;
    });
    // replace all \uxxxx values with actual uincode values
    // @ts-ignore comment suppresses all errors that originate on the following line.
    str = str.replace(/(\\u([0-9A-Fa-f]{1,5}))/gm, (match: string, p1: string, p2: string): string => {
      // p1 is entire unicode string
      // p2 is hex value
      const char = String.fromCharCode(parseInt(p2, 16));
      return char;
    });

    // Store placeholder for \\ to later be replaced by \
    str = str.replace(/\\\\/g, '\uFFFF');
    // store placeholder for \ to later be replaced by \ again
    // this will avoid a failure with JSON parse
    // str = str.replace(/\\/g, '\uFFFE');
    // replace line breaks \\r and \\n\\r with a \\n JSON.Parse will take care of the rest
    str = str.replace(/\\r\\n|\\r/gm, '\\n');
    // Restore place-held \\
    // str = str.replace(/\uFFFF/g, '\\');
    try {
      str = decodeURIComponent(JSON.parse('"' + str + '"'));
      // replace what was previously \\ with \ and restore \
      str = str.replace(/\uFFFF/g, '\\');
      // .replace(/\uFFFE/g, '\\');
      return str;
    } catch (error) {
      // ignore errors
      if (this.verbose) {
        grunt.log.verbose.write('GRUNT-BUILD-INCLUDE: Error decoding parameter str of decodeParam with value of:');
        grunt.log.verbose.write(str);
        grunt.log.verbose.write(' Error:');
        grunt.log.verbose.writeln(error.message);
      }
    }
    str = decodeURIComponent(str);
    // replace what was previously \\ with \ and restore \
    str = str.replace(/\uFFFF/g, '\\');
    // .replace(/\uFFFE/g, '\\');
    return str;
  };
  //  #endregion
  //  #region stringDecode
  /**
   * Decodes a string
   * @param s The string to decode
   * @param e The kind of encodeing or decodeing,
   * such as base64, base64uri, jsString, uri
   */
  private stringDecode(s: string, e: eKindType): string {
    if (s.length === 0) {
      return '';
    }
    let result: string;
    switch (e) {
      case eKind.uri:
        result = codeString(s, eKind.uri, eProcess.decode);
        break;
      case eKind.uriComponent:
        result = codeString(s, eKind.uriComponent, eProcess.decode);
        break;
      case eKind.base64:
        result = codeString(s, eKind.base64, eProcess.decode);
        break;
      case eKind.jsString:
        result = codeString(s, eKind.jsString, eProcess.decode);
        break;
      case eKind.tsString:
        result = codeString(s, eKind.tsString, eProcess.decode);
        break;
      default:
        result = s;
        break;
    }
    return result;
  };
  //  #endregion
  //  #region stringEncode
  /**
   * Encodes a string
   * @param s The string to encode
   * @param e The kind of encodeing or decodeing,
   * such as base64, base64uri, jsString, uri
   */
  private stringEncode(s: string, e: eKindType): string {
    if (s.length === 0) {
      return '';
    }
    let result: string;
    switch (e) {
      case eKind.uri:
        result = codeString(s, eKind.uri, eProcess.encode);
        break;
      case eKind.uri:
        result = codeString(s, eKind.uriComponent, eProcess.encode);
        break;
      case eKind.base64:
        result = codeString(s, eKind.base64, eProcess.encode);
        break;
      case eKind.jsString:
        result = codeString(s, eKind.jsString, eProcess.encode);
        break;
      case eKind.tsString:
        result = codeString(s, eKind.tsString, eProcess.encode);
        break;
      default:
        result = s;
        break;
    }
    return result;
  };
  // #endregion
  // #endregion
  // #region Split Args methods
  //  #region splitArgs
  /**
   * Split a comma-delimited string into an array.
   * <div>&nbsp;</div>
   * Escape chars for <code>,</code> is <code>&#92;,</code>
   * @param str String of arguments to split
   * @returns If str is empty the empty string array is returned;
   * Otherwise a string array of arguments is returned.
   */
  private splitArgs(str: string): string[] {
    if (!str || str.length === 0) {
      return [];
    }

    // Store placeholder for \,
    // there is an issue here
    // [text?PadRight=\\,breakstring?width=60,flags=word]
    // padright=\\ is ecpected to pad a sing \ however it is getting
    // escaped here as 
    // text?PadRight=\breakstring?width=60,flags=word
    // need to match \, but not \\,
    str = str.replace(/\\\\/g, '\uFEFF');
    str = str.replace(/\\,/g, '\uFFFE');
   
   
    // replace \[ with [ and \] with ]
    str = str.replace(/\\\[/g, '[')
      .replace(/\\\]/g, ']');
    // Split on ,
    return str.split(',').map((s) => {
      // Restore place-held ,
      return s.replace(/\uFFFE/g, ',')
        .replace(/\uFEFF/g, '\\\\');
    });
  }
  //  #endregion
  //  #region splitAndArgs
  /**
   * Split a &-delimited string into an array.
   * <div>&nbsp;</div>
   * Escape chars for <code>&</code> is <code>&#92;&</code>
   * @param str String of arguments to split
   * @returns If str is empty the empty string array is returned;
   * Otherwise a string array of arguments is returned.
   */
  private splitAndArgs(str: string): string[] {
    if (!str) {
      return [];
    }
    str = str.trimLeft();
    if (str.length === 0) {
      return [];
    }

    const cp: number = str.charCodeAt(0);
    // check for and remoeve starting & or ?
    if (cp === 63 || cp === 38) {
      str = str.substr(1);
    }
    // Store placeholder for \&
    str = str.replace(/\\\\/g, '\uFEFF');
    str = str.replace(/\\&/g, '\uFFFE');
    // Split on &
    return str.split('&').map((s) => {
      // Restore place-held &
      return s.replace(/\uFFFE/g, '&')
        .replace(/\uFEFF/g, '\\\\');
    });
  };
  //  #endregion
  //  #region splitEqArgs
  /**
   * Split a &-delimited string into an array.
   * <div>&nbsp;</div>
   * Escape chars for <code>=</code> is <code>&#92;=</code>
   * @param str String of arguments to split
   * @returns If str is empty the empty string array is returned;
   * Otherwise a string array of arguments is returned.
   */
  private splitEqArgs(str: string): string[] {
    if (!str || str.length === 0) {
      return [];
    }
    // Store placeholder for \=
    str = str.replace(/\\\\/g, '\uFEFF');
    str = str.replace(/\\=/g, '\uFFFE');
    // Split on =
    return str.split('=').map((s) => {
      // Restore place-held =
      return s.replace(/\uFFFE/g, '=')
        .replace(/\uFEFF/g, '\\\\');
    });
  }
  //  #endregion
  // #endregion
  // #region misc methods
  //  #region removeLnB
  /**
    * Replaces all instance of the \r\n then replaces all \n then finally
    * replaces all \r. It goes through and removes all types of line breaks
    * @param str String to replace line breaks in
    */
  private removeLnB(str: string): string {
    if (str.length === 0) {
      return '';
    }
    return str.replace(/(\r\n|\n|\r)/gm, '');
  };
  //  #endregion
  //  #region keyValueToString
  /**
   * Builds a string of key value pairs for an object
   * @param data Any object that has key value pairs
   * @param joiner The seperator between each key value pair
   * @example
```js
 *
 * var biOpt = {
 *     bs: {
 *         width: 80,
 *         lineEnd: 0,
 *         break: 80,
 *         isSet: false
 *     },
 *     comment: {
 *         type: 0,
 *         padLeft: 0
 *     },
 *     text: {
 *         isSet: false,
 *         before: 'something before',
 *         after: '',
 *         padLeft: 0,
 *         padRight: 0,
 *         code: 2,
 *         codeKind: 1
 *     },
 *     lines: [],
 * };
 * var str = this.keyValueToString(biOpt.text);
 * console.log(str);
 * // 'isSet=false; before=something before; after=; padLeft=0; padRight=0; code=2; codeKind=1'
```
   */
  private keyValueToString(data: any, joiner: string = '; '): string {
    const str: string[] = [];
    for (const k in data) {
      if (data.hasOwnProperty(k)) {
        const d = data[k].toString();
        d.replace(/'/g, "\\'")
          .replace(/"/g, '\\"');
        str.push(k.toString() + '=' + d);
      }
    }
    return str.join(joiner);
  };
  //  #endregion
  //  #region unixifyPath
  /**
   * Converts a path to Unix style if this is windows and
   * @param filepath Path to convert from window to unix style
   */
  private unixifyPath(filepath: string): string {
    if (this.isWindows) {
      return filepath.replace(/\\/g, '/');
    } else {
      return filepath;
    }
  };
  //  #endregion
  // #region isRegexStr
  /**
   * Test if a string starts and ends with /
   * @param s string to test
   */
  private isRegexStr(s: string) {
    // should not be able to build a regex in less than 5 chars for this
    if (s.length < 5) {
      return false;
    }
    if (s.substr(0, 1) === '/' && s.substr(s.length - 1, 1) === '/') {
      return true;
    }
    return false;
  }
  // #endregion
  // #endregion
  /**
   * Get an array of match matches that contains matches and if
   * [[IBuildIncludeOpt.fence]] is set in the options or grunt settings [[IBiGruntOpt.fence]]
   * is set then the return array may contain fences as well.
   * @param fileContent 
   * @param biOpt 
   */
  private getMatchArray(fileContent: string, biOpt: IBuildIncludeOpt): Array<IMatchType> {
    const result: Array<IMatchType> = [];
    if (biOpt.regexFence === undefined) {
      result.push({
        kind: matchKind.normal,
        value: fileContent,
      });
      return result;
    }
    const re: RegExp = biOpt.regexFence;
    let contents: string = fileContent;
    let match: RegExpExecArray | null;

    match = re.exec(contents);
    if (match === null) {
      result.push({
        kind: matchKind.normal,
        value: fileContent,
      });
      return result;
    }
    while (match !== null) {
      // we have a fenced match.
      let segment: string;
      // if contents currently starts with fence then emptyp string will become the current segment
      segment = contents.substring(0, match.index - 1);
      if (segment.length > 0) {
        // add normal segment
        result.push({
          kind: matchKind.normal,
          value: segment
        });
      }
      // now the fenced section
      const len = match[0].length
      let endIndex = (len - 1) + match.index;
      if (endIndex < 0) {
        endIndex = 0;
      }

      segment = contents.substr(match.index, len);
      // if option remove=true was set then do not add fence
      // all fenced section will be omitted by design when remove=true
      if (biOpt.fence.remove === false) {
        result.push({
          kind: matchKind.fence,
          value: segment
        });
      }
     
      // remove everything that has been process thus far.
      contents = contents.substring(endIndex + 1);
      match = re.exec(contents);
    }
    // if there are any remaining content the push it as normal.
    if (contents.length > 0) {
      result.push({
        kind: matchKind.normal,
        value: contents
      });
    }
    return result;
  }
  /**
   * Processes `matches` and returns an array with lines ommited based upon
   * [[IBuildIncludeOpt.text]] [[IText.noLineBreaks]] setting
   * @param biOpt The arguments from the options string values
   * The type of string nreaking will be terminde by args.asJsString
   * @param matches Array of matches
   * @returns New array of [[IMatchType]] filtered by any white space settings.
   */
  private processWhiteSpLns(biOpt: IBuildIncludeOpt, matches: Array<IMatchType>): Array<IMatchType> {
    if (matches.length === 0) {
      return [];
    }
    const result: Array<IMatchType> = [];
    const lineOpt = biOpt.text.whiteSpaceLine;
    const items: Array<IMatchItemWsItm> = [];
    matches.forEach(mt => {
      const pMI = this.processMatchItem(mt, lineOpt);
      items.push(pMI);
    });
    // now that all of the matched items are processed
    // filter out all of the lines that are breaking the rules
    let prevItem: IMatchItemWsItm | undefined;
    items.forEach(item => {
      switch (lineOpt) {
        case whiteSpLn.noTwoEmptyLn:
        case whiteSpLn.noTwoWsLn:
          if (prevItem !== undefined) {
            // countStart or countEnd cannot be > 1 for any item at this point.
            if (prevItem.countEnd > 0) {
              if (item.countStart > 0) {
                // remove empty lines as needed
                  while (item.countStart > 0) {
                    item.lines.shift();
                    item.countStart--;
                  }
              }
            } else if (item.countStart > 1) {
              while (item.countStart > 1) {
                item.lines.shift();
                item.countStart--;
              }
            }
          } else {
            if (item.countStart > 1) {
              while (item.countStart > 1) {
                item.lines.shift();
                item.countStart--;
              }
            }
          }
          if (item.lines.length > 0) {
            result.push(MatchItem.FromMatchItemWsItm(item));
          }
          break;
        case whiteSpLn.removeAllEmpty:
        case whiteSpLn.removeAllWs:
          if (item.lines.length > 0) {
            result.push(MatchItem.FromMatchItemWsItm(item));
          }
          break;
        default:
          result.push(MatchItem.FromMatchItemWsItm(item));
          break;
      }
      if (item.lines.length > 0) {
        // prevItem will act as last added item
        prevItem = Util.DeepCopy(item);
      }
    });
    return result;
  }
  /**
   * Processses a item of [[IMatchType]] and filters white space.
   * @param mt Current MatchItem to filter
   * @param lineOpt What filtering to apply.
   * @See [[processWhiteSpLns]]
   */
  private processMatchItem(mt: IMatchType, lineOpt: whiteSpLn): IMatchItemWsItm {
    let result: IMatchItemWsItm = {
      lines: [],
      countEnd: 0,
      countStart: 0,
      kind: mt.kind
    };
    const newLines: string[] = [];
    if (mt.value.length === 0) {
      return result;
    }
    let startEmpty: number = 0;
    let endEmpty: number = 0;
    let startDone: boolean = false;
    let isEmpty: boolean = false;
    const lines: string[] = stringBreaker(mt.value, { splitOpt: splitByOpt.line });
    
    lines.forEach(ln => {
      switch (lineOpt) {
        case whiteSpLn.noTwoEmptyLn:
          if (ln.length === 0) {
            isEmpty = true;
          } else {
            newLines.push(ln);
            isEmpty = false
            endEmpty = 0;
            startDone = true;
          }
          if (isEmpty === true) {
            if (startDone === false) {
              if (startEmpty < 1) {
                newLines.push(ln);
                startEmpty++
              }
            } else {
              if (endEmpty < 1) {
                newLines.push(ln);
                endEmpty++;
              }
            }
          }
          break;
        case whiteSpLn.noTwoWsLn:
          if (Util.IsEmptyOrWhiteSpace(ln) === true) {
            isEmpty = true;
          } else {
            newLines.push(ln);
            isEmpty = false
            endEmpty = 0;
            startDone = true;
          }
          if (isEmpty === true) {
            if (startDone === false) {
              if (startEmpty < 1) {
                newLines.push(ln);
                startEmpty++
              }
            } else {
              if (endEmpty < 1) {
                newLines.push(ln);
                endEmpty++;
              }
            }
          }
          break;
        case whiteSpLn.removeAllEmpty:
          if (ln.length > 0) {
            newLines.push(ln);
          }
          break;
        case whiteSpLn.removeAllWs:
          if (Util.IsEmptyOrWhiteSpace(ln) === false) {
            newLines.push(ln);
          }
          break;
        default:
          newLines.push(ln);
          break;
      }
    });
    result = {
      lines: newLines,
      countEnd: endEmpty,
      countStart: startEmpty,
      kind: mt.kind
    };

    return result;
  }
}