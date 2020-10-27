import { IBiOpt } from "build-include/cjs/interface/projectInterfaces";

export type ProcessFn = (contents: string, srcpath: string, destpath: string) => (string | boolean);

export interface IBiGruntOpt extends IBiOpt {
  /**
     * [[include:GruntOptions/process.md]]
     */
  process: boolean | ProcessFn;
  /**
   * [[include:GruntOptions/noProcess.md]]
  */
  noProcess: any;
  mode: boolean | number;
  timestamp: boolean;
}