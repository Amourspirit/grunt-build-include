import { IMatchType, IClone, IMatchItemWsItm } from "./interfaces";
import { matchKind} from "./enums";
import { Util } from "./util";
import { EOL } from 'os';
/**
 * Class that aids in proccessing of [[IMatchType]] instances.
 */
export class MatchItem implements IMatchType, IClone<MatchItem> {
  /**
   * Converts from whites space item
   * @param mtWdItm white space item convert
   * @returns insance that represents values form `mtWdItm`
   */
  public static FromMatchItemWsItm(mtWdItm: IMatchItemWsItm) {
    const mt: IMatchType = {
      kind: mtWdItm.kind,
      value: mtWdItm.lines.join(EOL)
    }
    const result = new MatchItem(mt);
    return result;
  }
  /** Current Kind */
  public kind: matchKind;
  /** Current value */
  public value: string;

  /**
   * Constructs an instance of the class
   * @param mt Match type used to construct instance
   */
  public constructor(mt: IMatchType) {
    this.kind = mt.kind;
    this.value = mt.value;
  }

  /**
   * Clones the current instance and returns a copy.
   */
  public clone(): MatchItem {
    const mt: IMatchType = this.toMatchType();
    const copy = new MatchItem(mt);
    return copy;
  }
  /**
   * Converts instance of class to simple object.
   */
  public toMatchType(): IMatchType {
    const mt: IMatchType = {
      kind: this.kind,
      value: this.value
    }
    return mt;
  }
  /**
   * Gets if the current instance value is empty or white space only.
   * @returns `true` if [[value]] for the current instance
   * is empty string or whitespace; Otherwise, `false`
   */
  public isWhiteSpace(): boolean {
   return Util.IsEmptyOrWhiteSpace(this.value);
  }
  /**
   * Gets if the current instance value is empty.
   * @returns `true` if [[value]] for the current instance
   * is empty string; Otherwise, `false`.
   * 
   * If [[value]] is whitespace and not empty `false` will be returned.
   * Use [[isWhiteSpace]] to test for whitespace.
   */
  public isEmpty(): boolean {
    if (this.value.length === 0) {
      return true;
    }
    return false;
  }
}