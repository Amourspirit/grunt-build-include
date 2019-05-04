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
export const flexFence: IGruntOptFence = {
  start: /^(?:[ \t]+)?(?:\*)?(?:[ \t]+)?(?:(```)(?:[^ \t])([a-zA-Z\r\n]+)?)(?:[\s\S]+?)/,
  end: /^(?:[ \t]+)?(?:\*)?(?:[ \t]+)?(```)(?:(?:$)|(?:[\r\n]+))/
}