/**
 * @module enums
 */
/**
 *[[include:docs/enums/commentKind/commentKind.md]]
 */
export enum commentKind {
  /**
   * [[include:docs/enums/commentKind/none.md]]
   */
  none,
  /**
   * [[include:docs/enums/commentKind/single.md]]
   */
  single,
  /**
   * [[include:docs/enums/commentKind/multi.md]]
   */
  multi,
  /**
   * [[include:docs/enums/commentKind/jsdoc.md]]
   */
  jsdoc,
  /**
   * [[include:docs/enums/commentKind/html.md]]
   */
  html,
  /**
   * [[include:docs/enums/commentKind/pound.md]]
   */
  pound,
  /**
   * [[include:docs/enums/commentKind/jsAuto.md]]
   */
  jsAuto,
  /**
   * [[include:docs/enums/commentKind/singleAsterisk.md]]
   */
  singleAsterisk
};
/** Extend enum commentKind to have a parse method */
export namespace commentKind {
  /**
   * Parses a value to enum of commentKind
   * @param value The string or number to convert into enum
   * @param anyCase If true will match an enum value of any case; Otherwise, case must match.
   * @returns The value converted into commentKind
   */
  export const parse = (value: string | number, anyCase: boolean = true): commentKind => {
    const num: number = parseInt(value.toString(), 10);
    let v: string | number;
    if (isNaN(num) === true) {
      v = value;
    } else {
      v = num;
    }
    if (typeof v === 'number') {
      const e: commentKind = v;
      return e;
    } else if (typeof v === 'string' && v.length > 0) {
      if (anyCase === true) {
        v = v.toLowerCase();
        for (const k in commentKind) {
          if (commentKind.hasOwnProperty(k)) {
            const val = commentKind[k]
            if (typeof val === 'number') {
              const kLc = k.toLowerCase();
              if (kLc === v) {
                const e: commentKind = val;
                return e;
              }
            }
          }
        }
      } else {
        for (const k in commentKind) {
          if (commentKind.hasOwnProperty(k)) {
            const val = commentKind[k]
            if (typeof val === 'number') {
              if (k === v) {
                const e: commentKind = val;
                return e;
              }
            }
          }
        }
      }
    }
    return commentKind.none;
  };
}
/** The kind of internal regex to build */
export enum regexKind {
  /**
   * [[include:docs/enums/regexKind/buildInclude.md]]
   */
  buildInclude,
  /**
   * [[include:docs/enums/regexKind/buildIncludeHtml.md]]
   */
  buildIncludeHtml,
  /**
   * [[include:docs/enums/regexKind/buildIncludePound.md]]
   */
  buildIncludePound,
  /**
   * [[include:docs/enums/regexKind/buildIncludeSlash.md]]
   */
  buildIncludeSlash,
  /**
   * [[include:docs/enums/regexKind/bracketInclude.md]]
   */
  bracketInclude,
  /**
  * [[include:docs/enums/regexKind/bracketIncludeMulti.md]]
  */
  bracketIncludeMulti
}
/** Extend enum regexKind to have a parse method */
export namespace regexKind {
  /**
   * Parses a value to enum of regexKind
   * @param value The string or number to convert into enum
   * @param anyCase If true will match an enum value of any case; Otherwise, case must match.
   * @returns The value converted into regexKind
   */
  export const parse = (value: string | number, anyCase: boolean = true): regexKind => {
    const num: number = parseInt(value.toString(), 10);
    let v: string | number;
    if (isNaN(num) === true) {
      v = value;
    } else {
      v = num;
    }
    if (typeof v === 'number') {
      const e: regexKind = v;
      return e;
    } else if (typeof v === 'string' && v.length > 0) {
      if (anyCase === true) {
        v = v.toLowerCase();
        for (const k in regexKind) {
          if (regexKind.hasOwnProperty(k)) {
            const val = regexKind[k]
            if (typeof val === 'number') {
              const kLc = k.toLowerCase();
              if (kLc === v) {
                const e: regexKind = val;
                return e;
              }
            }
          }
        }
      } else {
        for (const k in regexKind) {
          if (regexKind.hasOwnProperty(k)) {
            const val = regexKind[k]
            if (typeof val === 'number') {
              if (k === v) {
                const e: regexKind = val;
                return e;
              }
            }
          }
        }
      }
    }
    return regexKind.buildInclude;
  };
}
// #region fenceKind
/** The kind of fence to protect from processing to build */
/**
 * The kind of fencing to apply to build_includ replcement
 */
export enum fenceKind {
  /** No fencing */
  none,
  /**
   * Apply strict.  
   * See: [[strictFence]]
   */
  strict,
  /**
  * Apply flex.
  * See: [[flexFence]]
  */
  flex,
  // https://regexr.com/4dipp
  /**
   * Pseudo Fence.
   * 
   * Combines [[escapeFence]], [[tildeFence]] and [[strictFence]]
   */
  multiFlex,
  /**
  * Apply tilde.
  * See: [[tildeFence]]
  */
  tilde,
  /**
  * Apply tilde.
  * See: [[escapeFence]]
  */
  escape
}
/** Extend enum fenceKind to have a parse method */
export namespace fenceKind {
  /**
   * Parses a value to enum of fenceKind
   * @param value The string or number to convert into enum
   * @param anyCase If true will match an enum value of any case; Otherwise, case must match.
  * @returns The value converted into fenceKind
   */
  export const parse = (value: string | number, anyCase: boolean = true): fenceKind => {
    const num: number = parseInt(value.toString(), 10);
    let v: string | number;
    if (isNaN(num) === true) {
      v = value;
    } else {
      v = num;
    }
    if (typeof v === 'number') {
      const e: fenceKind = v;
      return e;
    } else if (typeof v === 'string' && v.length > 0) {
      if (anyCase === true) {
        v = v.toLowerCase();
        for (const k in fenceKind) {
          if (fenceKind.hasOwnProperty(k)) {
            const val = fenceKind[k]
            if (typeof val === 'number') {
              const kLc = k.toLowerCase();
              if (kLc === v) {
                const e: fenceKind = val;
                return e;
              }
            }
          }
        }
      } else {
        for (const k in fenceKind) {
          if (fenceKind.hasOwnProperty(k)) {
            const val = fenceKind[k]
            if (typeof val === 'number') {
              if (k === v) {
                const e: fenceKind = val;
                return e;
              }
            }
          }
        }
      }
    }
    return fenceKind.none;
  };
}
// #endregion
// #region matchKind
/**
 * Enum for internal matching kinds
 */
export enum matchKind {
  /** Normal match */
  normal,
  /** Fenced match */
  fence
}
// #endregion
// #region whiteSpLn
/**
 * Enumeration options on how to handle whitespace lines
 */
export enum whiteSpLn {
  /**
   * Take no action.
   */
  noAction,
  /**
   * If two or more white space line are together then they
   * are reduced to one white space line.
   */
  noTwoWsLn,
  /** If two or more empty lines are together then they
   * are reduced to one empty line.
   */
  noTwoEmptyLn,
  /**
   * All white space line are removed.
   */
  removeAllWs,
  /**
   * All empty lines are removed.
   */
  removeAllEmpty
}
/** Extend enum whiteSpLn to have a parse method */
export namespace whiteSpLn {
  /**
   * Parses a value to enum of whiteSpLn
   * @param value The string or number to convert into enum
   * @param anyCase If true will match an enum value of any case; Otherwise, case must match.
  * @returns The value converted into whiteSpLn
   */
  export const parse = (value: string | number, anyCase: boolean = true): whiteSpLn => {
    const num: number = parseInt(value.toString(), 10);
    let v: string | number;
    if (isNaN(num) === true) {
      v = value;
    } else {
      v = num;
    }
    if (typeof v === 'number') {
      const e: whiteSpLn = v;
      return e;
    } else if (typeof v === 'string' && v.length > 0) {
      if (anyCase === true) {
        v = v.toLowerCase();
        for (const k in whiteSpLn) {
          if (whiteSpLn.hasOwnProperty(k)) {
            const val = whiteSpLn[k]
            if (typeof val === 'number') {
              const kLc = k.toLowerCase();
              if (kLc === v) {
                const e: whiteSpLn = val;
                return e;
              }
            }
          }
        }
      } else {
        for (const k in whiteSpLn) {
          if (whiteSpLn.hasOwnProperty(k)) {
            const val = whiteSpLn[k]
            if (typeof val === 'number') {
              if (k === v) {
                const e: whiteSpLn = val;
                return e;
              }
            }
          }
        }
      }
    }
    return whiteSpLn.noAction;
  };
}
// #endregion