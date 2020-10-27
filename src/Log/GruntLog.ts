import { LogEvent } from "build-include/cjs/log/LogEvent";
import { MsgEventAnyArgs } from "build-include/cjs/event/MsgEventAnyArgs";
import { EventArgs } from "build-include/cjs/event/EventArgs";
import { CancelEventArgs } from "build-include/cjs/event/CancelEventArgs";
import * as grunt from 'grunt';
import * as util from 'util';
import { EOL } from 'os';

export class GruntLog extends LogEvent {
  public preFix = '[Guunt-Build-Include]: ';
  constructor() {
    super();
  }
  /**
   * Log Errors method
   * @param args Arguments to write
   */
  public error(...args: any[]): void {
    if (this.isVerbose === true) {
      const mArgs = new MsgEventAnyArgs();
      mArgs.message = this.preFix + ' ' + this.foramted(...args);
      mArgs.message = mArgs.message.trim();
      mArgs.args = args;
      this.onBeforeError(mArgs);
      if (mArgs.cancel === true) {
        return;
      }
      grunt.log.error(this.preFix + this.foramted(mArgs.message));
      this.onAfterError(mArgs);
    }
    
  }

  /**
   * Write a new ling to the log
   * @param args one or more string args to write
   */
  public write(...args: string[]): void {
    if (this.isVerbose === true) {
      const mArgs = new MsgEventAnyArgs();
      mArgs.message = this.foramted(...args);
      mArgs.args = args;
      this.onBeforeWrite(mArgs);
      if (mArgs.cancel === true) {
        return;
      }
      grunt.log.write(this.foramted(mArgs.message));
      this.onAfterWrite(mArgs);
    }
    
  }
  /**
   * Log standard line
   * @param args Arguments to write
   */
  public writeln(...args: any[]): void {
    if (this.isVerbose === true) {
      const mArgs = new MsgEventAnyArgs();
      mArgs.message = this.preFix + ' ' + this.foramted(...args);
      mArgs.message = mArgs.message.trim();
      mArgs.args = args;
      this.onBeforeWriteln(mArgs);
      if (mArgs.cancel === true) {
        return;
      }
      grunt.log.writeln(mArgs.message);
      this.onAfterWriteln(mArgs);
    }
    
  }
  /**
  * Write warning to log
  @param args Arguments to write
  */
  public warn(...args: any[]): void {
    if (this.isVerbose === true) {
      const mArgs = new MsgEventAnyArgs();
      mArgs.message = this.preFix + ' Warning: ' + this.foramted(...args);
      mArgs.message = mArgs.message.trim();
      mArgs.args = args;
      this.onBeforeWarn(mArgs);
      if (mArgs.cancel === true) {
        return;
      }
      grunt.log.warn(mArgs.message)
      this.onAfterWarn(mArgs);
    }
    
  }
  /**
  * Write a line terminator to log
  */
  public emptyln(): void {
    if (this.isVerbose === true) {
      const cArgs = new CancelEventArgs();
      this.onBeforeEmptyln(cArgs);
      if (cArgs.cancel === true) {
        return;
      }
      process.stdout.write(EOL);
      this.onAfterEmptyln(EventArgs.Empty);
    }
  }

  private foramted(...args: any[]): string {
    if (args.length === 0) {
      return '';
    }
    if (args.length === 1) {
      // tslint:disable-next-line: no-construct
      return new String(args[0]).toString();
    }
    // const arr = { ...args };
    const first: any = args.shift();
    return util.format(first, ...args);
  }
}