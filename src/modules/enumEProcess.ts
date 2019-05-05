/**
 * @module enums
 */
import { eProcess as meProc } from 'multi-encoder';
export enum meProcess {
  none = -1
}

// export const eProcess = Object.assign({}, meProcess, meProc);
export namespace meProcess {
  /**
   * Parses a value to enum of eProcess
   * @param value The string or number to convert into enum
   * @param anyCase If true will match an enum value of any case; Otherwise, case must match.
   * @returns The value converted into eProcess
   */
  export const parse = (value: string | number, anyCase: boolean = true): eProcessType => {
    const num: number = parseInt(value.toString(), 10);
    let v: string | number;
    if (isNaN(num) === true) {
      v = value;
    } else {
      v = num;
    }
    if (typeof v === 'number') {
      const e: eProcessType = v;
      return e;
    } else if (typeof v === 'string' && v.length > 0) {
      if (anyCase === true) {
        v = v.toLowerCase();
        for (const k in eProcess) {
          if (eProcess.hasOwnProperty(k)) {
            const val = eProcess[k]
            if (typeof val === 'number') {
              const kLc = k.toLowerCase();
              if (kLc === v) {
                const e: eProcessType = val;
                return e;
              }
            }
          }
        }
      } else {
        for (const k in eProcess) {
          if (eProcess.hasOwnProperty(k)) {
            const val = eProcess[k]
            if (typeof val === 'number') {
              if (k === v) {
                const e: eProcessType = val;
                return e;
              }
            }
          }
        }
      }
    }
    return eProcess.none;
  };
}

/**
 * [[include:docs/enums/eProcess/eProcessType.md]]
 * [[include:docs/enums/eProcess/eProcess.md]]
 */
export type eProcessType = meProcess | meProc;
/**
 * [[include:docs/enums/eProcess/eProcess.md]]
 */
export const eProcess = {
  ...meProcess,
  ...meProc
};