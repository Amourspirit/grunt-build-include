import { LoggerEvent } from "build-include/cjs/log/LoggerEvent";
import { GruntLog } from "./GruntLog";
import { EOL } from 'os';
import { MsgEventArgs } from "build-include/cjs/event/MsgEventArg";
import { CancelEventArgs } from "build-include/cjs/event/CancelEventArgs";

export class GruntLogger extends LoggerEvent {
  private static LAST_LINE: string = '';
  constructor() {
    super();
    this.log = new GruntLog();
    this.log.isVerbose = true;
    this.verbose = new GruntLog();
    this.verbose.isVerbose = false;
    this.log.isVerbose = true;

    this.log.addHandlerBeforeError(this.onError);
    this.verbose.addHandlerBeforeError(this.onError);
    this.log.addHandlerBeforeWrite(this.onWrite);
    this.verbose.addHandlerBeforeWrite(this.onWrite);
    this.log.addHandlerBeforeWriteln(this.onWriteln);
    this.verbose.addHandlerBeforeWriteln(this.onWriteln);
    this.log.addHandlerBeforeWarn(this.onWarn);
    this.verbose.addHandlerBeforeWarn(this.onWarn);
    this.log.addHandlerBeforeEmptyln(this.onEmptyln);
    this.verbose.addHandlerBeforeEmptyln(this.onEmptyln);
  }
  /**
 * Gets if the verbose logger is logging,
 * If true verbose logger will log: Otherwise,
 * verbose logger will not log
 */
  public get isVerbose() {
    return this.verbose.isVerbose;
  }

  public set isVerbose(value: boolean) {
    this.verbose.isVerbose = value;
  }

  private onError(e: MsgEventArgs) {
    if (GruntLogger.LAST_LINE === ".") {
      process.stdout.write(EOL);
    }
    GruntLogger.LAST_LINE = e.message;
  }
  private onWrite(e: MsgEventArgs) {
    GruntLogger.LAST_LINE = e.message;
  }
  private onWriteln(e: MsgEventArgs) {
    if (GruntLogger.LAST_LINE === ".") {
      process.stdout.write(EOL);
    }
    GruntLogger.LAST_LINE = e.message;
  }
  private onWarn(e: MsgEventArgs) {
    if (GruntLogger.LAST_LINE === ".") {
      process.stdout.write(EOL);
    }
    GruntLogger.LAST_LINE = e.message;
  }
  // tslint:disable-next-line: variable-name
  private onEmptyln(_e: CancelEventArgs) {
    GruntLogger.LAST_LINE = EOL;
  }
}