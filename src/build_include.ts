import { buildInc } from './modules/buildInc';
import { defaultOptions } from "build-include/cjs/opt/defaultOptions";
import { IBiGruntOpt } from './Interfaces/interfaces';
// @ts-ignore comment suppresses all errors that originate on the following line.
import * as IGrunt from 'grunt';


module.exports = (grunt: IGrunt) => {
  
  // Nodejs libs.
  const path = require('path');
  const fs = require('fs');
  const chalk = require('chalk');
  const fileSyncCmp = require('file-sync-cmp');
  const isWindows = process.platform === 'win32';
  grunt.registerMultiTask('build_include', 'Replace BUILD_INCLUDE blocks', () => {
    const opt: IBiGruntOpt = {
      encoding: defaultOptions.encoding,
      process: false,
      noProcess: {},
      asJsString: defaultOptions.asJsString,
      breakstring: defaultOptions.breakstring,
      comment: defaultOptions.comment,
      fence: defaultOptions.fence,
      ignoreMissing: defaultOptions.ignoreMissing,
      internal: defaultOptions.internal,
      match: defaultOptions.match,
      mode: false,
      override: defaultOptions.override,
      recursion: defaultOptions.recursion,
      text: defaultOptions.text,
      timestamp: false,
      verbose: defaultOptions.verbose
     };

    const options: IBiGruntOpt = grunt.task.current.options(opt);
    const copyOptions: grunt.file.IFileWriteStringOption = {
      encoding: options.encoding,
      process: typeof options.process === 'function' ? options.process : buildInc,
      noProcess: options.noProcess,
    };

    const detectDestType = (dest: string): string => {
      if (dest.endsWith('/')) {
        return 'directory';
      } else {
        return 'file';
      }
    };
    const unixifyPath = (filepath: string): string => {
      if (isWindows) {
        return filepath.replace(/\\/g, '/');
      } else {
        return filepath;
      }
    };

    const syncTimestamp = (src: string, dest: string): void => {
      const stat = fs.lstatSync(src);
      if (path.basename(src) !== path.basename(dest)) {
        return;
      }

      if (stat.isFile() && !fileSyncCmp.equalFiles(src, dest)) {
        return;
      }

      const fd = fs.openSync(dest, isWindows ? 'r+' : 'r');
      fs.futimesSync(fd, stat.atime, stat.mtime);
      fs.closeSync(fd);
    };
    let isExpandedPair: boolean;
    const dirs: { [key: string]: string } = {};
    const tally = {
      dirs: 0,
      files: 0,
    };
    grunt.task.current.files.forEach(
      (filePair: grunt.file.IFilesConfig): void => {
        isExpandedPair = filePair.expand || false;
        if (filePair.src) {
          filePair.src.forEach((src: string) => {
            src = unixifyPath(src);
            let dest: string = unixifyPath(filePair.dest + '');

            if (detectDestType(dest) === 'directory') {
              dest = isExpandedPair ? dest : path.join(dest, src);
            }

            if (grunt.file.isDir(src)) {
              grunt.log.verbose.writeln('Creating ' + chalk.cyan(dest));
              grunt.file.mkdir(dest);
              if (options.mode !== false) {
                fs.chmodSync(dest, options.mode === true ? fs.lstatSync(src).mode : options.mode);
              }

              if (options.timestamp) {
                dirs[dest] = src;
              }

              tally.dirs++;
            } else {
              grunt.log.verbose.writeln('Copying ' + chalk.cyan(src) + ' -> ' + chalk.cyan(dest));
              grunt.file.copy(src, dest, copyOptions);
              if (options.timestamp !== false) {
                syncTimestamp(src, dest);
              }
              if (options.mode !== false) {
                fs.chmodSync(dest, options.mode === true ? fs.lstatSync(src).mode : options.mode);
              }
              tally.files++;
            }
          });
        }
      },
    );
  });
};
