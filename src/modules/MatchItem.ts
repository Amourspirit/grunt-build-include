import { IMatchType, IClone, IMatchItemWsItm } from "./interfaces";
import { matchKind} from "./enums";
import { Util } from "./util";
import { EOL } from 'os';

export class MatchItem implements IMatchType, IClone<MatchItem> {
  public static FromMatchItemWsItm(mtWdItm: IMatchItemWsItm) {
    const mt: IMatchType = {
      kind: mtWdItm.kind,
      value: mtWdItm.lines.join(EOL)
    }
    const result = new MatchItem(mt);
    return result;
  }
  public kind: matchKind;
  public value: string;

  public constructor(mt: IMatchType) {
    this.kind = mt.kind;
    this.value = mt.value;
  }

  public clone(): MatchItem {
    const mt: IMatchType = this.toMatchType();
    const copy = new MatchItem(mt);
    return copy;
  }
  public toMatchType(): IMatchType {
    const mt: IMatchType = {
      kind: this.kind,
      value: this.value
    }
    return mt;
  }
  public isWhiteSpace(): boolean {
   return Util.IsEmptyOrWhiteSpace(this.value);
  }
  public isEmpty(): boolean {
    if (this.value.length === 0) {
      return true;
    }
    return false;
  }
}