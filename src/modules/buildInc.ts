import { BuildProcess } from 'build-include/cjs/BuildProcess';
import { IBiOpt } from "build-include/cjs/interface/projectInterfaces";
import { defaultOptions } from "build-include/cjs/opt/defaultOptions";
import { GruntLogger } from "../Log/GruntLogger";
import * as grunt from 'grunt';
import * as path from 'path';

/**
 * Process contents and returns a the processed contents.
 * 
 * @param contents The contents of the file currently being read
 * @param srcpath The source path of the file that contents were read from
 * @param _destpath The destination file that the contents are to be written into.
 * @return The contents of the file after they have been processed.
 */
// tslint:disable-next-line: variable-name
export const buildInc = (contents: string, srcpath: string, _destpath: string): string => {
    let strPath = srcpath;
    if (!path.isAbsolute(srcpath)) {
        strPath = path.resolve(process.cwd(), srcpath);
    }
    const logger = new GruntLogger();
    logger.isVerbose = grunt.option('verbose') ? true : false;
    const bi = new BuildProcess(logger);
    const options: IBiOpt = grunt.task.current.options(defaultOptions);

    const results = bi.buildInclude(contents, strPath, options);
    return results;
};