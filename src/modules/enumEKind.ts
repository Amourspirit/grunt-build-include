/**
 * @module enums
 */
import { eKind as kind } from 'multi-encoder';

export enum meKind {
  none = -1
}

export namespace meKind {
  /**
   * Parses a value to enum of eKind
   * @param value The string or number to convert into enum
   * @param anyCase If true will match an enum value of any case; Otherwise, case must match.
   * @returns The value converted into eKind
   */
  export const parse = (value: string | number, anyCase: boolean = true): eKindType => {
    const num: number = parseInt(value.toString(), 10);
    let v: string | number;
    if (isNaN(num) === true) {
      v = value;
    } else {
      v = num;
    }
    if (typeof v === 'number') {
      const e: eKindType = v;
      return e;
    } else if (typeof v === 'string' && v.length > 0) {
      if (anyCase === true) {
        v = v.toLowerCase();
        for (const k in eKind) {
          if (eKind.hasOwnProperty(k)) {
            const val = eKind[k]
            if (typeof val === 'number') {
              const kLc = k.toLowerCase();
              if (kLc === v) {
                const e: eKindType = val;
                return e;
              }
            }
          }
        }
      } else {
        for (const k in eKind) {
          if (eKind.hasOwnProperty(k)) {
            const val = eKind[k]
            if (typeof val === 'number') {
              if (k === v) {
                const e: eKindType = val;
                return e;
              }
            }
          }
        }
      }
    }
    return eKind.none;
  };
}
/**
 * [[include:docs/enums/ekind/ekindType.md]]
 * [[include:docs/enums/ekind/eKind.md]]
 */
export type eKindType = meKind | kind;
/**
 * [[include:docs/enums/eKind.md]]
 */
export const eKind = {
  ...meKind,
  ...kind
}