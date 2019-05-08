/**
 * @module fences
 */
import { IGruntOptFence } from "../interfaces";
// #region TildeFence
/**
 * [[include:docs/IFence/IFence.md]]
 * [[include:docs/fenceOpt/tildeFence/tildeFence.md]]
 */
export class TildeFence implements IGruntOptFence {
  /**
   * [[include:docs/fenceOpt/flexFence/start.md]]
   */
  public start: string | RegExp;
  /**
  * [[include:docs/fenceOpt/flexFence/end.md]]
  */
  public end: string | RegExp;
  public constructor() {
    this.start = '~~~';
    this.end = '~~~';
  }
}
// #endregion