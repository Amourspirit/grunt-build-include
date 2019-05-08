import { IMatchType, IClone } from "./interfaces";
import { matchKind} from "./enums";
import { Util } from "./util";

export class MatchItem implements IMatchType, IClone<MatchItem> {
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