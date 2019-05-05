import { IGruntOptFence } from "./interfaces";
// #region strictFence
/**
 * [[include:docs/IFence/IFence.md]]
 * [[include:docs/fenceOpt/strictFence/strictFence.md]]
 * @see [[IBiGruntOpt.fence]]
 */
export const strictFence: IGruntOptFence = {
  /**
   * [[include:docs/fenceOpt/strictFence/start.md]]
   */
  start: '```',
  /**
   * [[include:docs/fenceOpt/strictFence/end.md]]
   */
  end: '```'
}
// #endregion
/**
 * [[include:docs/IFence/IFence.md]]
 * [[include:docs/fenceOpt/flexFence/flexFence.md]]
 */
export const flexFence: IGruntOptFence = {
  /**
   * [[include:docs/fenceOpt/flexFence/start.md]]
   */
  start: /^(?:[ \t]+)?(?:\*)?(?:[ \t]+)?(?:(```)(?:[^ \t])([a-zA-Z\r\n]+)?)(?:[\s\S]+?)/,
  /**
   * [[include:docs/fenceOpt/flexFence/end.md]]
   */
  end: /^(?:[ \t]+)?(?:\*)?(?:[ \t]+)?(```)(?:(?:$)|(?:[\r\n]+))/
}