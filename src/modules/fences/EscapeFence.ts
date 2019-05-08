/**
 * @module fences
 */
import { IGruntOptFence } from "../interfaces";
// #region EscapeFence
/**
 * [[include:docs/IFence/IFence.md]]
 * [[include:docs/fenceOpt/escapeFence/escapeFence.md]]
 */
export class EscapeFence implements IGruntOptFence {
  /**
   * [[include:docs/fenceOpt/flexFence/start.md]]
   */
  public start: string | RegExp;
  /**
   * [[include:docs/fenceOpt/flexFence/end.md]]
   */
  public end: string | RegExp;
  public constructor() {
    this.start = '````';
    this.end = '````';
  }
}
// #endregion