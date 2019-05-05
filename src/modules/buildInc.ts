import { BuildProcess } from './BuildProcess';
/**
 * Process contents and returns a the processed contents.
 * <div>&nbsp;</div>
 * <strong>See:</strong> [[BuildProcess.buildInclude]]
 * @param contents The contents of the file currently being read
 * @param srcpath The source path of the file that contents were read from
 * @param destpath The destination file that the contents are to be written into.
 * @return The contents of the file after they have been processed.
 */
export const buildInc = (contents: string, srcpath: string, destpath: string): string => {
    const bi = new BuildProcess();
    const results = bi.buildInclude(contents,srcpath);
    return results;
};