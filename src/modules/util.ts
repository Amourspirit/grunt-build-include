import { splitByOpt, lnEndOpt } from "string-breaker";

export class Util {
  /**
   * Test if an object is a function
   * @param obj Object to test
   * @returns `true` if obj is a function; Otherwise, `false`
   */
    public static IsFunction(obj: any): boolean {
      return !!(obj && obj.constructor && obj.call && obj.apply);
    };

  /**
   * Parses a value to enum of splitByOpt
   * @param value The string or number to convert into enum
   * @param anyCase If true will match an enum value of any case; Otherwise, case must match.
   * @returns The value converted into splitByOpt
   */
  public static ParseEnumSplitByOpt(value: string | number, anyCase: boolean = true): splitByOpt {
    const num: number = parseInt(value.toString(), 10);
    let v: string | number;
    if (isNaN(num) === true) {
      v = value;
    } else {
      v = num;
    }
    if (typeof v === 'number') {
      const e: splitByOpt = v;
      return e;
    } else if (typeof v === 'string' && v.length > 0) {
      if (anyCase === true) {
        v = v.toLowerCase();
        for (const k in splitByOpt) {
          if (splitByOpt.hasOwnProperty(k)) {
            const val = splitByOpt[k]
            if (typeof val === 'number') {
              const kLc = k.toLowerCase();
              if (kLc === v) {
                const e: splitByOpt = val;
                return e;
              }
            }
          }
        }
      } else {
        if (v.length > 0 && v in splitByOpt) {
          let dekString: keyof typeof splitByOpt = 'width';
          dekString = v as keyof typeof splitByOpt;
          return splitByOpt[dekString];
        }
      }
    }
    return splitByOpt.width;
  };
  /**
   * Parses a value to enum of lnEndOpt
   * @param value The string or number to convert into enum
   * @param anyCase If true will match an enum value of any case; Otherwise, case must match.
   * @returns The value converted into lnEndOpt
   */
  public static ParseEnumLnEndOpt(value: string | number, anyCase: boolean = true): lnEndOpt {
    const num: number = parseInt(value.toString(), 10);
    let v: string | number;
    if (isNaN(num) === true) {
      v = value;
    } else {
      v = num;
    }
    if (typeof v === 'number') {
      const e: lnEndOpt = v;
      return e;
    } else if (typeof v === 'string' && v.length > 0) {
      if (anyCase === true) {
        v = v.toLowerCase();
        for (const k in lnEndOpt) {
          if (lnEndOpt.hasOwnProperty(k)) {
            const val = lnEndOpt[k]
            if (typeof val === 'number') {
              const kLc = k.toLowerCase();
              if (kLc === v) {
                const e: lnEndOpt = val;
                return e;
              }
            }
          }
        }
      } else {
        if (v.length > 0 && v in lnEndOpt) {
          let dekString: keyof typeof lnEndOpt = 'noLnBr';
          dekString = v as keyof typeof lnEndOpt;
          return lnEndOpt[dekString];
        }
      }
    }
    return lnEndOpt.noLnBr;
  };
  /**
   * Escapes a string for use in a regular expression
   * @param str String to escape
   */
  public static EscapeRegex(str: string): string {
    // https://stackoverflow.com/questions/5105143/list-of-all-characters-that-should-be-escaped-before-put-in-to-regex
    if (!str) {
      return '';
    }
    let s = str;
    s = s.replace(/\\/g, '\\\\') // it is important that \ is escaped first
      .replace(/\./g, '\\.')
      .replace(/\+/g, '\\+')
      .replace(/\*/g, '\\*')
      .replace(/\?/g, '\\?')
      .replace(/\[/g, '\\[')
      .replace(/\]/g, '\\]')
      .replace(/\^/g, '\\^')
      .replace(/\$/g, '\\$')
      .replace(/\(/g, '\\(')
      .replace(/\)/g, '\\)')
      .replace(/\{/g, '\\{')
      .replace(/\}/g, '\\}')
      .replace(/\=/g, '\\=')
      .replace(/\!/g, '\\!')
      .replace(/\>/g, '\\>')
      .replace(/\</g, '\\<')
      .replace(/\|/g, '\\|')
      .replace(/\:/g, '\\:')
      .replace(/\-/g, '\\-');
    return s;
  };
};